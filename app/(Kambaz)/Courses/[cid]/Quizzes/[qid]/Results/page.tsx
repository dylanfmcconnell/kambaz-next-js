"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as client from "../../client";
import type { Quiz, QuizAttempt } from "../../client";
import { useSession } from "../../../../../Account/Session";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function QuizResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const { currentUser } = useSession();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const isPreview = searchParams.get("preview") === "true";
  const attemptIdParam = searchParams.get("attemptId");
  const previewScore = searchParams.get("score");
  const previewTotal = searchParams.get("total");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const quizData = await client.fetchQuiz(qid);
      setQuiz(quizData);

      if (!isPreview && attemptIdParam) {
        const attemptData = await client.fetchAttempt(attemptIdParam);
        setAttempt(attemptData);
      }
    } catch (err) {
      console.error("Failed to load results", err);
    } finally {
      setLoading(false);
    }
  }, [qid, attemptIdParam, isPreview]);

  useEffect(() => {
    if (qid) loadData();
  }, [qid, loadData]);

  const getAnswerForQuestion = (questionId: string) => {
    if (!attempt) return null;
    return attempt.answers.find((a) => a.questionId === questionId);
  };

  const getCorrectAnswerDisplay = (question: Quiz["questions"][0]) => {
    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        return correctChoice?.text || "N/A";
      case "TRUE_FALSE":
        return question.correctAnswer === "true" ? "True" : "False";
      case "FILL_IN_BLANK":
        return question.possibleAnswers?.join(" or ") || "N/A";
    }
  };

  const getUserAnswerDisplay = (
    question: Quiz["questions"][0],
    userAnswer: string
  ) => {
    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        const selectedChoice = question.choices?.find(
          (c) => c._id === userAnswer
        );
        return selectedChoice?.text || "No answer";
      case "TRUE_FALSE":
        return userAnswer === "true" ? "True" : userAnswer === "false" ? "False" : "No answer";
      case "FILL_IN_BLANK":
        return userAnswer || "No answer";
    }
  };

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (!quiz) {
    return <div className="alert alert-danger">Quiz not found</div>;
  }

  // Preview mode results
  if (isPreview) {
    return (
      <div id="wd-quiz-results">
        <h2>{quiz.title} - Preview Results</h2>

        <div className="alert alert-info">
          <strong>Preview Mode:</strong> These results are not saved.
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h3>
              Score: {previewScore} / {previewTotal}
            </h3>
            <p className="text-muted">
              {Math.round(
                (Number(previewScore) / Number(previewTotal || 1)) * 100
              )}
              %
            </p>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
          >
            Back to Quiz Details
          </button>
          {isFaculty && (
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`)}
            >
              Edit Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  // Real attempt results
  if (!attempt) {
    return <div className="alert alert-danger">Attempt not found</div>;
  }

  const scorePercentage = attempt.totalPoints
    ? Math.round((attempt.score / attempt.totalPoints) * 100)
    : 0;

  return (
    <div id="wd-quiz-results">
      <h2>{quiz.title} - Results</h2>

      {/* Score Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <h3>
            Score: {attempt.score} / {attempt.totalPoints}
          </h3>
          <div className="progress mb-2" style={{ height: "25px" }}>
            <div
              className={`progress-bar ${
                scorePercentage >= 70
                  ? "bg-success"
                  : scorePercentage >= 50
                    ? "bg-warning"
                    : "bg-danger"
              }`}
              style={{ width: `${scorePercentage}%` }}
            >
              {scorePercentage}%
            </div>
          </div>
          <p className="text-muted">
            Attempt #{attempt.attemptNumber} | Submitted:{" "}
            {attempt.endTime
              ? new Date(attempt.endTime).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Question Review */}
      <h4>Question Review</h4>

      {quiz.questions.map((question, index) => {
        const answerRecord = getAnswerForQuestion(question._id);
        const isCorrect = answerRecord?.isCorrect || false;
        const userAnswer = answerRecord?.answer || "";

        return (
          <div
            key={question._id}
            className={`card mb-3 ${
              isCorrect ? "border-success" : "border-danger"
            }`}
          >
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                isCorrect ? "bg-success text-white" : "bg-danger text-white"
              }`}
            >
              <span>
                Question {index + 1}: {question.title}
              </span>
              <span>
                {isCorrect ? (
                  <>
                    <FaCheck className="me-1" /> {answerRecord?.pointsEarned || 0} /{" "}
                    {question.points} pts
                  </>
                ) : (
                  <>
                    <FaTimes className="me-1" /> 0 / {question.points} pts
                  </>
                )}
              </span>
            </div>
            <div className="card-body">
              <p>
                <strong>Question:</strong> {question.questionText}
              </p>

              <p>
                <strong>Your Answer:</strong>{" "}
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {getUserAnswerDisplay(question, userAnswer)}
                </span>
              </p>

              {/* Show correct answer based on quiz settings */}
              {(quiz.showCorrectAnswers === "immediately" ||
                (quiz.showCorrectAnswers === "after_due_date" &&
                  quiz.dueDate &&
                  new Date() > new Date(quiz.dueDate))) && (
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-success">
                    {getCorrectAnswerDisplay(question)}
                  </span>
                </p>
              )}

              {/* Show all choices for multiple choice */}
              {question.questionType === "MULTIPLE_CHOICE" && (
                <div className="mt-3">
                  <strong>All Choices:</strong>
                  <ul className="list-group mt-2">
                    {question.choices?.map((choice) => {
                      const isSelected = userAnswer === choice._id;
                      const showCorrect =
                        quiz.showCorrectAnswers === "immediately" ||
                        (quiz.showCorrectAnswers === "after_due_date" &&
                          quiz.dueDate &&
                          new Date() > new Date(quiz.dueDate));

                      return (
                        <li
                          key={choice._id}
                          className={`list-group-item ${
                            isSelected
                              ? choice.isCorrect
                                ? "list-group-item-success"
                                : "list-group-item-danger"
                              : showCorrect && choice.isCorrect
                                ? "list-group-item-success"
                                : ""
                          }`}
                        >
                          {isSelected && (
                            <span className="me-2">
                              {choice.isCorrect ? (
                                <FaCheck className="text-success" />
                              ) : (
                                <FaTimes className="text-danger" />
                              )}
                            </span>
                          )}
                          {showCorrect && choice.isCorrect && !isSelected && (
                            <span className="me-2">
                              <FaCheck className="text-success" />
                            </span>
                          )}
                          {choice.text}
                          {isSelected && (
                            <span className="badge bg-secondary ms-2">
                              Your answer
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Navigation */}
      <div className="d-flex gap-2 mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}
