"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";
import type { Quiz, Choice } from "../../client";
import { useSession } from "../../../../../Account/Session";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

type Tab = "details" | "questions";

interface QuestionDraft {
  _id?: string;
  title: string;
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  choices: Choice[];
  correctAnswer?: string;
  possibleAnswers: string[];
  isEditing: boolean;
  isNew: boolean;
}

const emptyQuestion: QuestionDraft = {
  title: "New Question",
  questionText: "",
  questionType: "MULTIPLE_CHOICE",
  points: 1,
  choices: [
    { _id: "temp-1", text: "", isCorrect: true },
    { _id: "temp-2", text: "", isCorrect: false }
  ],
  correctAnswer: "true",
  possibleAnswers: [""],
  isEditing: true,
  isNew: true
};

export default function QuizEditor() {
  const router = useRouter();
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const { currentUser } = useSession();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  // Details form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState<Quiz["quizType"]>("GRADED_QUIZ");
  const [assignmentGroup, setAssignmentGroup] =
    useState<Quiz["assignmentGroup"]>("QUIZZES");
  const [timeLimit, setTimeLimit] = useState(20);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [howManyAttempts, setHowManyAttempts] = useState(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("immediately");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] =
    useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // Questions state
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client.fetchQuiz(qid);
      setQuiz(data);

      // Populate form fields
      setTitle(data.title || "");
      setDescription(data.description || "");
      setQuizType(data.quizType);
      setAssignmentGroup(data.assignmentGroup);
      setTimeLimit(data.timeLimit);
      setShuffleAnswers(data.shuffleAnswers);
      setMultipleAttempts(data.multipleAttempts);
      setHowManyAttempts(data.howManyAttempts);
      setShowCorrectAnswers(data.showCorrectAnswers);
      setAccessCode(data.accessCode || "");
      setOneQuestionAtATime(data.oneQuestionAtATime);
      setWebcamRequired(data.webcamRequired);
      setLockQuestionsAfterAnswering(data.lockQuestionsAfterAnswering);
      setDueDate(data.dueDate ? data.dueDate.split("T")[0] : "");
      setAvailableFrom(
        data.availableFrom ? data.availableFrom.split("T")[0] : ""
      );
      setAvailableUntil(
        data.availableUntil ? data.availableUntil.split("T")[0] : ""
      );

      // Populate questions
      setQuestions(
        (data.questions || []).map((q) => ({
          ...q,
          choices: q.choices || [],
          correctAnswer: q.correctAnswer || "true",
          possibleAnswers: q.possibleAnswers || [],
          isEditing: false,
          isNew: false
        }))
      );
    } catch (err) {
      console.error("Failed to load quiz", err);
    } finally {
      setLoading(false);
    }
  }, [qid]);

  useEffect(() => {
    if (qid) loadQuiz();
  }, [qid, loadQuiz]);

  // Protect route
  useEffect(() => {
    if (currentUser && !isFaculty) {
      router.replace(`/Courses/${cid}/Quizzes`);
    }
  }, [currentUser, isFaculty, cid, router]);

  const calculateTotalPoints = () => {
    return questions.reduce((sum, q) => sum + (q.points || 0), 0);
  };

  const saveDetails = async () => {
    try {
      await client.updateQuiz(qid, {
        title,
        description,
        quizType,
        assignmentGroup,
        timeLimit,
        shuffleAnswers,
        multipleAttempts,
        howManyAttempts,
        showCorrectAnswers,
        accessCode,
        oneQuestionAtATime,
        webcamRequired,
        lockQuestionsAfterAnswering,
        dueDate: dueDate || undefined,
        availableFrom: availableFrom || undefined,
        availableUntil: availableUntil || undefined,
        points: calculateTotalPoints()
      });
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (err) {
      console.error("Failed to save quiz", err);
    }
  };

  const saveAndPublish = async () => {
    try {
      await client.updateQuiz(qid, {
        title,
        description,
        quizType,
        assignmentGroup,
        timeLimit,
        shuffleAnswers,
        multipleAttempts,
        howManyAttempts,
        showCorrectAnswers,
        accessCode,
        oneQuestionAtATime,
        webcamRequired,
        lockQuestionsAfterAnswering,
        dueDate: dueDate || undefined,
        availableFrom: availableFrom || undefined,
        availableUntil: availableUntil || undefined,
        points: calculateTotalPoints()
      });
      await client.publishQuiz(qid);
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err) {
      console.error("Failed to save and publish quiz", err);
    }
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  // ==================== QUESTION HANDLERS ====================

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        ...emptyQuestion,
        _id: `temp-${Date.now()}`,
        choices: [
          { _id: `temp-${Date.now()}-1`, text: "", isCorrect: true },
          { _id: `temp-${Date.now()}-2`, text: "", isCorrect: false }
        ]
      }
    ]);
  };

  const updateQuestionField = (
    index: number,
    field: keyof QuestionDraft,
    value: unknown
  ) => {
    setQuestions(questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestionLocal = (index: number) => {
    const q = questions[index];
    if (q._id && !q.isNew) {
      // Delete from server
      client.deleteQuestion(qid, q._id).catch(console.error);
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveQuestion = async (index: number) => {
    const q = questions[index];
    try {
      if (q.isNew) {
        // Create on server
        const newQ = await client.addQuestion(qid, {
          title: q.title,
          questionText: q.questionText,
          questionType: q.questionType,
          points: q.points,
          choices: q.choices,
          correctAnswer: q.correctAnswer,
          possibleAnswers: q.possibleAnswers
        });
        const updated = [...questions];
        updated[index] = {
          ...updated[index],
          _id: newQ._id,
          isNew: false,
          isEditing: false
        };
        setQuestions(updated);
      } else {
        // Update on server
        await client.updateQuestion(qid, q._id!, {
          title: q.title,
          questionText: q.questionText,
          questionType: q.questionType,
          points: q.points,
          choices: q.choices,
          correctAnswer: q.correctAnswer,
          possibleAnswers: q.possibleAnswers
        });
        const updated = [...questions];
        updated[index].isEditing = false;
        setQuestions(updated);
      }
    } catch (err) {
      console.error("Failed to save question", err);
    }
  };

  const cancelQuestionEdit = (index: number) => {
    const q = questions[index];
    if (q.isNew) {
      // Remove unsaved new question
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      // Reload from server
      loadQuiz();
    }
  };

  // ==================== CHOICE HANDLERS ====================

  const addChoice = (qIndex: number) => {
    setQuestions(questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            choices: [...q.choices, { _id: `temp-${Date.now()}`, text: "", isCorrect: false }]
          }
        : q
    ));
  };

  const updateChoice = (
    qIndex: number,
    cIndex: number,
    field: keyof Choice,
    value: unknown
  ) => {
    setQuestions(questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            choices: q.choices.map((c, j) =>
              j === cIndex ? { ...c, [field]: value } : c
            )
          }
        : q
    ));
  };

  const setCorrectChoice = (qIndex: number, cIndex: number) => {
    const updated = [...questions];
    updated[qIndex].choices = updated[qIndex].choices.map((c, i) => ({
      ...c,
      isCorrect: i === cIndex
    }));
    setQuestions(updated);
  };

  const removeChoice = (qIndex: number, cIndex: number) => {
    const updated = [...questions];
    updated[qIndex].choices = updated[qIndex].choices.filter(
      (_, i) => i !== cIndex
    );
    setQuestions(updated);
  };

  // ==================== FILL IN BLANK HANDLERS ====================

  const addPossibleAnswer = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].possibleAnswers.push("");
    setQuestions(updated);
  };

  const updatePossibleAnswer = (
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].possibleAnswers[aIndex] = value;
    setQuestions(updated);
  };

  const removePossibleAnswer = (qIndex: number, aIndex: number) => {
    const updated = [...questions];
    updated[qIndex].possibleAnswers = updated[qIndex].possibleAnswers.filter(
      (_, i) => i !== aIndex
    );
    setQuestions(updated);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isFaculty) {
    return null;
  }

  return (
    <div id="wd-quiz-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title || "Unnamed Quiz"}</h2>
        <div>
          <span className="me-3">Points: {calculateTotalPoints()}</span>
          <span
            className={`badge ${quiz?.published ? "bg-success" : "bg-secondary"}`}
          >
            {quiz?.published ? "Published" : "Not Published"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div id="wd-quiz-details-editor" style={{ maxWidth: 800 }}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quiz Instructions</label>
            <textarea
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Quiz Type</label>
              <select
                className="form-select"
                value={quizType}
                onChange={(e) =>
                  setQuizType(e.target.value as Quiz["quizType"])
                }
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Assignment Group</label>
              <select
                className="form-select"
                value={assignmentGroup}
                onChange={(e) =>
                  setAssignmentGroup(e.target.value as Quiz["assignmentGroup"])
                }
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
          </div>

          <h5 className="mt-4">Options</h5>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Time Limit (Minutes)</label>
              <input
                type="number"
                className="form-control"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="multipleAttempts"
              checked={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>

          {multipleAttempts && (
            <div className="row mb-3 ms-4">
              <div className="col-md-6">
                <label className="form-label">How Many Attempts</label>
                <input
                  type="number"
                  className="form-control"
                  value={howManyAttempts}
                  onChange={(e) => setHowManyAttempts(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>
          )}

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Show Correct Answers</label>
              <select
                className="form-select"
                value={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.value)}
              >
                <option value="immediately">Immediately</option>
                <option value="after_due_date">After Due Date</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Access Code</label>
            <input
              type="text"
              className="form-control"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Leave blank for no access code"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="oneQuestionAtATime"
              checked={oneQuestionAtATime}
              onChange={(e) => setOneQuestionAtATime(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="oneQuestionAtATime">
              One Question at a Time
            </label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="webcamRequired"
              checked={webcamRequired}
              onChange={(e) => setWebcamRequired(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="webcamRequired">
              Webcam Required
            </label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="lockQuestionsAfterAnswering"
              checked={lockQuestionsAfterAnswering}
              onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="lockQuestionsAfterAnswering"
            >
              Lock Questions After Answering
            </label>
          </div>

          <h5 className="mt-4">Dates</h5>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Available From</label>
              <input
                type="date"
                className="form-control"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Available Until</label>
              <input
                type="date"
                className="form-control"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div id="wd-quiz-questions-editor">
          <div className="d-flex justify-content-between mb-3">
            <span>Total Points: {calculateTotalPoints()}</span>
            <button className="btn btn-outline-primary" onClick={addNewQuestion}>
              + New Question
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="alert alert-info">
              No questions yet. Click &quot;+ New Question&quot; to add one.
            </div>
          ) : (
            questions.map((question, qIndex) => (
              <div key={question._id || qIndex} className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{question.title || `Question ${qIndex + 1}`}</strong>
                    <span className="ms-3 text-muted">
                      {question.points} pts
                    </span>
                  </div>
                  <div>
                    {!question.isEditing && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => updateQuestionField(qIndex, "isEditing", true)}
                        >
                          <FaPencilAlt /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteQuestionLocal(qIndex)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  {question.isEditing ? (
                    // Edit Mode
                    <div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Question Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={question.title}
                            onChange={(e) =>
                              updateQuestionField(qIndex, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Question Type</label>
                          <select
                            className="form-select"
                            value={question.questionType}
                            onChange={(e) =>
                              updateQuestionField(
                                qIndex,
                                "questionType",
                                e.target.value
                              )
                            }
                          >
                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                            <option value="TRUE_FALSE">True/False</option>
                            <option value="FILL_IN_BLANK">Fill in the Blank</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Points</label>
                          <input
                            type="number"
                            className="form-control"
                            value={question.points}
                            onChange={(e) =>
                              updateQuestionField(
                                qIndex,
                                "points",
                                Number(e.target.value)
                              )
                            }
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Question Text</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={question.questionText}
                          onChange={(e) =>
                            updateQuestionField(
                              qIndex,
                              "questionText",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Multiple Choice Answers */}
                      {question.questionType === "MULTIPLE_CHOICE" && (
                        <div className="mb-3">
                          <label className="form-label">Answers</label>
                          {question.choices.map((choice, cIndex) => (
                            <div
                              key={choice._id || cIndex}
                              className="input-group mb-2"
                            >
                              <div className="input-group-text">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={choice.isCorrect}
                                  onChange={() => setCorrectChoice(qIndex, cIndex)}
                                  title="Mark as correct answer"
                                />
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={choice.text}
                                onChange={(e) =>
                                  updateChoice(qIndex, cIndex, "text", e.target.value)
                                }
                                placeholder={
                                  choice.isCorrect ? "Correct Answer" : "Possible Answer"
                                }
                              />
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => removeChoice(qIndex, cIndex)}
                                disabled={question.choices.length <= 2}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          ))}
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => addChoice(qIndex)}
                          >
                            + Add Another Answer
                          </button>
                        </div>
                      )}

                      {/* True/False Answer */}
                      {question.questionType === "TRUE_FALSE" && (
                        <div className="mb-3">
                          <label className="form-label">Correct Answer</label>
                          <div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`tf-${qIndex}`}
                                id={`tf-true-${qIndex}`}
                                checked={question.correctAnswer === "true"}
                                onChange={() =>
                                  updateQuestionField(qIndex, "correctAnswer", "true")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`tf-true-${qIndex}`}
                              >
                                True
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`tf-${qIndex}`}
                                id={`tf-false-${qIndex}`}
                                checked={question.correctAnswer === "false"}
                                onChange={() =>
                                  updateQuestionField(qIndex, "correctAnswer", "false")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`tf-false-${qIndex}`}
                              >
                                False
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fill in the Blank Answers */}
                      {question.questionType === "FILL_IN_BLANK" && (
                        <div className="mb-3">
                          <label className="form-label">
                            Possible Correct Answers (case insensitive)
                          </label>
                          {question.possibleAnswers.map((answer, aIndex) => (
                            <div key={aIndex} className="input-group mb-2">
                              <input
                                type="text"
                                className="form-control"
                                value={answer}
                                onChange={(e) =>
                                  updatePossibleAnswer(qIndex, aIndex, e.target.value)
                                }
                                placeholder="Possible Answer"
                              />
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => removePossibleAnswer(qIndex, aIndex)}
                                disabled={question.possibleAnswers.length <= 1}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          ))}
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => addPossibleAnswer(qIndex)}
                          >
                            + Add Another Answer
                          </button>
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-secondary"
                          onClick={() => cancelQuestionEdit(qIndex)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => saveQuestion(qIndex)}
                        >
                          {question.isNew ? "Save Question" : "Update Question"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <p>{question.questionText}</p>

                      {question.questionType === "MULTIPLE_CHOICE" && (
                        <ul className="list-group">
                          {question.choices.map((choice, cIndex) => (
                            <li
                              key={choice._id || cIndex}
                              className={`list-group-item ${
                                choice.isCorrect
                                  ? "list-group-item-success"
                                  : ""
                              }`}
                            >
                              {choice.isCorrect && <strong>✓ </strong>}
                              {choice.text}
                            </li>
                          ))}
                        </ul>
                      )}

                      {question.questionType === "TRUE_FALSE" && (
                        <p>
                          <strong>Correct Answer:</strong>{" "}
                          {question.correctAnswer === "true" ? "True" : "False"}
                        </p>
                      )}

                      {question.questionType === "FILL_IN_BLANK" && (
                        <div>
                          <strong>Accepted Answers:</strong>
                          <ul>
                            {question.possibleAnswers.map((answer, aIndex) => (
                              <li key={aIndex}>{answer}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Action Buttons */}
      <hr />
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-secondary" onClick={cancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={saveDetails}>
          Save
        </button>
        <button className="btn btn-danger" onClick={saveAndPublish}>
          Save and Publish
        </button>
      </div>
    </div>
  );
}
