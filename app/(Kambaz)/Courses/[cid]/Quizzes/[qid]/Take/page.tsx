"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as client from "../../client";
import type { Quiz, Question, QuizAttempt } from "../../client";
import { useSession } from "../../../../../Account/Session";

interface AnswerState {
  [questionId: string]: string;
}

interface LockedState {
  [questionId: string]: boolean;
}

export default function TakeQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const { currentUser } = useSession();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const isPreview = searchParams.get("preview") === "true";
  const attemptIdParam = searchParams.get("attemptId");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [lockedQuestions, setLockedQuestions] = useState<LockedState>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Shuffle array (for shuffleAnswers)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const quizData = await client.fetchQuiz(qid);
      setQuiz(quizData);

      // Prepare questions (potentially shuffled)
      let questions = quizData.questions || [];
      if (quizData.shuffleAnswers) {
        // Shuffle choices within each question for multiple choice
        questions = questions.map((q) => ({
          ...q,
          choices: q.choices ? shuffleArray(q.choices) : q.choices
        }));
      }
      setShuffledQuestions(questions);

      // Set time limit
      if (quizData.timeLimit) {
        setTimeRemaining(quizData.timeLimit * 60); // Convert to seconds
      }

      // If we have an attempt ID, load it
      if (attemptIdParam && !isPreview) {
        const attemptData = await client.fetchAttempt(attemptIdParam);
        setAttempt(attemptData);

        // Pre-populate answers from attempt
        const existingAnswers: AnswerState = {};
        attemptData.answers.forEach((a) => {
          existingAnswers[a.questionId] = a.answer;
        });
        setAnswers(existingAnswers);
      }
    } catch (err) {
      console.error("Failed to load quiz", err);
    } finally {
      setLoading(false);
    }
  }, [qid, attemptIdParam, isPreview]);

  useEffect(() => {
    if (qid) loadQuiz();
  }, [qid, loadQuiz]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || isPreview) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isPreview]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = async (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // Save answer to server (for real attempts, not preview)
    if (attempt && !isPreview) {
      try {
        await client.saveAnswer(attempt._id, questionId, answer);
      } catch (err) {
        console.error("Failed to save answer", err);
      }
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      if (isPreview) {
        // For preview, calculate score locally
        const results = calculatePreviewScore();
        router.push(
          `/Courses/${cid}/Quizzes/${qid}/Results?preview=true&score=${results.score}&total=${results.total}`
        );
      } else if (attempt) {
        // Submit actual attempt
        const submitted = await client.submitAttempt(attempt._id);
        router.push(
          `/Courses/${cid}/Quizzes/${qid}/Results?attemptId=${submitted._id}`
        );
      }
    } catch (err) {
      console.error("Failed to submit quiz", err);
      setSubmitting(false);
    }
  };

  const calculatePreviewScore = () => {
    if (!quiz) return { score: 0, total: 0 };

    let score = 0;
    let total = 0;

    shuffledQuestions.forEach((question) => {
      total += question.points || 0;
      const userAnswer = answers[question._id];

      if (!userAnswer) return;

      switch (question.questionType) {
        case "MULTIPLE_CHOICE":
          const correctChoice = question.choices?.find((c) => c.isCorrect);
          if (correctChoice && correctChoice._id === userAnswer) {
            score += question.points || 0;
          }
          break;
        case "TRUE_FALSE":
          if (question.correctAnswer === userAnswer) {
            score += question.points || 0;
          }
          break;
        case "FILL_IN_BLANK":
          if (
            question.possibleAnswers?.some(
              (pa) => pa.toLowerCase().trim() === userAnswer.toLowerCase().trim()
            )
          ) {
            score += question.points || 0;
          }
          break;
      }
    });

    return { score, total };
  };

  // Navigate to a question, locking the current one if it has an answer and lock is enabled
  const goToQuestion = (index: number) => {
    if (!quiz) return;

    // If lock is enabled, lock the current question if it has an answer
    if (quiz.lockQuestionsAfterAnswering && quiz.oneQuestionAtATime) {
      const currentQuestionId = shuffledQuestions[currentQuestionIndex]?._id;
      if (currentQuestionId && answers[currentQuestionId]) {
        setLockedQuestions((prev) => ({ ...prev, [currentQuestionId]: true }));
      }
    }

    setCurrentQuestionIndex(index);
  };

  // Check if a question is locked
  const isQuestionLocked = (questionId: string) => {
    return quiz?.lockQuestionsAfterAnswering && lockedQuestions[questionId];
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="alert alert-danger">Quiz not found</div>;
  }

  const currentQuestion = quiz.oneQuestionAtATime
    ? shuffledQuestions[currentQuestionIndex]
    : null;

  return (
    <div id="wd-take-quiz">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        {timeRemaining !== null && !isPreview && (
          <div
            className={`badge ${timeRemaining < 60 ? "bg-danger" : "bg-secondary"} fs-5`}
          >
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Preview banner */}
      {isPreview && (
        <div className="alert alert-warning">
          <strong>Preview Mode:</strong> This is a preview of the quiz. Your
          answers will not be saved.
        </div>
      )}

      {/* Quiz Instructions */}
      {quiz.description && (
        <div className="mb-4">
          <h5>Quiz Instructions</h5>
          <p>{quiz.description}</p>
        </div>
      )}

      {/* One question at a time mode */}
      {quiz.oneQuestionAtATime && currentQuestion ? (
        <div>
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between">
              <span>
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
              </span>
              <span>{currentQuestion.points} pts</span>
            </div>
            <div className="card-body">
              <h5>{currentQuestion.title}</h5>
              <p>{currentQuestion.questionText}</p>

              {/* Multiple Choice */}
              {currentQuestion.questionType === "MULTIPLE_CHOICE" && (
                <div>
                  {currentQuestion.choices?.map((choice) => (
                    <div key={choice._id} className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${currentQuestion._id}`}
                        id={`choice-${choice._id}`}
                        checked={answers[currentQuestion._id] === choice._id}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, choice._id)
                        }
                        disabled={isQuestionLocked(currentQuestion._id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`choice-${choice._id}`}
                      >
                        {choice.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* True/False */}
              {currentQuestion.questionType === "TRUE_FALSE" && (
                <div>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${currentQuestion._id}`}
                      id={`tf-true-${currentQuestion._id}`}
                      checked={answers[currentQuestion._id] === "true"}
                      onChange={() =>
                        handleAnswerChange(currentQuestion._id, "true")
                      }
                      disabled={isQuestionLocked(currentQuestion._id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tf-true-${currentQuestion._id}`}
                    >
                      True
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${currentQuestion._id}`}
                      id={`tf-false-${currentQuestion._id}`}
                      checked={answers[currentQuestion._id] === "false"}
                      onChange={() =>
                        handleAnswerChange(currentQuestion._id, "false")
                      }
                      disabled={isQuestionLocked(currentQuestion._id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tf-false-${currentQuestion._id}`}
                    >
                      False
                    </label>
                  </div>
                </div>
              )}

              {/* Fill in the Blank */}
              {currentQuestion.questionType === "FILL_IN_BLANK" && (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={answers[currentQuestion._id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion._id, e.target.value)
                    }
                    placeholder="Type your answer"
                    disabled={isQuestionLocked(currentQuestion._id)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < shuffledQuestions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  goToQuestion(Math.min(shuffledQuestions.length - 1, currentQuestionIndex + 1))
                }
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>

          {/* Question navigation sidebar */}
          <div className="mt-4">
            <h6>Questions</h6>
            <div className="d-flex flex-wrap gap-2">
              {shuffledQuestions.map((q, index) => (
                <button
                  key={q._id}
                  className={`btn btn-sm ${
                    index === currentQuestionIndex
                      ? "btn-primary"
                      : isQuestionLocked(q._id)
                        ? "btn-secondary"
                        : answers[q._id]
                          ? "btn-success"
                          : "btn-outline-secondary"
                  }`}
                  onClick={() => goToQuestion(index)}
                  title={isQuestionLocked(q._id) ? "Locked" : ""}
                >
                  {index + 1}
                  {isQuestionLocked(q._id) && " 🔒"}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // All questions at once mode
        <div>
          {shuffledQuestions.map((question, index) => (
            <div key={question._id} className="card mb-3">
              <div className="card-header d-flex justify-content-between">
                <span>Question {index + 1}</span>
                <span>{question.points} pts</span>
              </div>
              <div className="card-body">
                <h5>{question.title}</h5>
                <p>{question.questionText}</p>

                {/* Multiple Choice */}
                {question.questionType === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.choices?.map((choice) => (
                      <div key={choice._id} className="form-check mb-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`question-${question._id}`}
                          id={`choice-${choice._id}`}
                          checked={answers[question._id] === choice._id}
                          onChange={() =>
                            handleAnswerChange(question._id, choice._id)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`choice-${choice._id}`}
                        >
                          {choice.text}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False */}
                {question.questionType === "TRUE_FALSE" && (
                  <div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${question._id}`}
                        id={`tf-true-${question._id}`}
                        checked={answers[question._id] === "true"}
                        onChange={() => handleAnswerChange(question._id, "true")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`tf-true-${question._id}`}
                      >
                        True
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${question._id}`}
                        id={`tf-false-${question._id}`}
                        checked={answers[question._id] === "false"}
                        onChange={() =>
                          handleAnswerChange(question._id, "false")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`tf-false-${question._id}`}
                      >
                        False
                      </label>
                    </div>
                  </div>
                )}

                {/* Fill in the Blank */}
                {question.questionType === "FILL_IN_BLANK" && (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      value={answers[question._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question._id, e.target.value)
                      }
                      placeholder="Type your answer"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            className="btn btn-danger btn-lg"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      )}

      {/* Keep Editing link for faculty preview */}
      {isPreview && isFaculty && (
        <div className="mt-4">
          <button
            className="btn btn-link"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`)}
          >
            Keep Editing This Quiz
          </button>
        </div>
      )}
    </div>
  );
}
