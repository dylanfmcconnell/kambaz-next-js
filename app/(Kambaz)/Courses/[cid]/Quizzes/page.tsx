"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";
import type { Quiz } from "./client";
import { useSession } from "../../../Account/Session";
import { FaCheckCircle, FaBan, FaEllipsisV, FaRocket } from "react-icons/fa";

export default function Quizzes() {
  const router = useRouter();
  const { cid } = useParams() as { cid: string };
  const { currentUser } = useSession();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);

  const loadQuizzes = useCallback(async () => {
    try {
      const data = await client.fetchQuizzes(cid);
      // Sort by available date (earliest first), quizzes without dates at end
      const sorted = data.sort((a, b) => {
        if (!a.availableFrom && !b.availableFrom) return 0;
        if (!a.availableFrom) return 1;
        if (!b.availableFrom) return -1;
        return new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime();
      });
      setQuizzes(sorted);
    } catch (err) {
      console.error("Failed to load quizzes", err);
      setQuizzes([]);
    }
  }, [cid]);

  useEffect(() => {
    if (cid) loadQuizzes();
  }, [cid, loadQuizzes]);

  const deleteQuiz = async (id: string) => {
    try {
      await client.deleteQuiz(id);
      setQuizzes(quizzes.filter((q) => q._id !== id));
      setConfirmId(null);
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  };

  const togglePublish = async (quiz: Quiz) => {
    try {
      if (quiz.published) {
        await client.unpublishQuiz(quiz._id);
      } else {
        await client.publishQuiz(quiz._id);
      }
      setQuizzes(
        quizzes.map((q) =>
          q._id === quiz._id ? { ...q, published: !q.published } : q
        )
      );
    } catch (err) {
      console.error("Failed to toggle publish", err);
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableUntil && now > availableUntil) {
      return "Closed";
    }
    if (availableFrom && now < availableFrom) {
      return `Not available until ${new Date(quiz.availableFrom!).toLocaleDateString()}`;
    }
    if (
      (!availableFrom || now >= availableFrom) &&
      (!availableUntil || now <= availableUntil)
    ) {
      return "Available";
    }
    return "Closed";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString();
  };

  const handleAddQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(cid, {
        title: "Unnamed Quiz",
        quizType: "GRADED_QUIZ",
        assignmentGroup: "QUIZZES",
        points: 0,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        shuffleAnswers: true,
        showCorrectAnswers: "immediately",
        oneQuestionAtATime: true,
        lockQuestionsAfterAnswering: false,
        accessCode: "",
        webcamRequired: false,
        published: false,
        questions: []
      });
      router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/Editor`);
    } catch (err) {
      console.error("Failed to create quiz", err);
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Quizzes</h2>
        {isFaculty && (
          <button
            className="btn btn-danger"
            onClick={handleAddQuiz}
            id="wd-add-quiz-click"
          >
            + Quiz
          </button>
        )}
      </div>

      {quizzes.length === 0 ? (
        <div className="alert alert-info">
          No quizzes yet.{" "}
          {isFaculty && "Click the + Quiz button to create one."}
        </div>
      ) : (
        <ul className="list-group">
          <li className="list-group-item bg-secondary">
            <strong>Assignment Quizzes</strong>
          </li>
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex align-items-center"
            >
              {/* Publish icon for faculty */}
              {isFaculty && (
                <span
                  className="me-3"
                  role="button"
                  onClick={() => togglePublish(quiz)}
                  title={quiz.published ? "Unpublish" : "Publish"}
                >
                  {quiz.published ? (
                    <FaCheckCircle className="text-success fs-5" />
                  ) : (
                    <FaBan className="text-secondary fs-5" />
                  )}
                </span>
              )}

              {/* Quiz rocket icon */}
              <FaRocket className="text-success me-3" />

              {/* Quiz info */}
              <div
                className="flex-grow-1"
                role="button"
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                }
              >
                <strong>{quiz.title}</strong>
                <div className="text-secondary small">
                  <span className="me-2">
                    <strong>{getAvailabilityStatus(quiz)}</strong>
                  </span>
                  {quiz.dueDate && (
                    <span className="me-2">
                      | <strong>Due</strong> {formatDate(quiz.dueDate)}
                    </span>
                  )}
                  <span className="me-2">| {quiz.points} pts</span>
                  <span className="me-2">| {quiz.questions?.length || 0} Questions</span>
                  {!isFaculty && quiz.latestScore !== null && quiz.latestScore !== undefined && (
                    <span className="me-2">
                      | <strong>Score:</strong> {quiz.latestScore}
                    </span>
                  )}
                </div>
              </div>

              {/* Faculty actions */}
              {isFaculty && (
                <div className="position-relative">
                  <button
                    className="btn btn-link text-dark"
                    onClick={() =>
                      setContextMenuId(
                        contextMenuId === quiz._id ? null : quiz._id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {/* Context menu dropdown */}
                  {contextMenuId === quiz._id && (
                    <div
                      className="dropdown-menu show position-absolute end-0"
                      style={{ zIndex: 1000 }}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setContextMenuId(null);
                          router.push(
                            `/Courses/${cid}/Quizzes/${quiz._id}/Editor`
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setContextMenuId(null);
                          setConfirmId(quiz._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setContextMenuId(null);
                          togglePublish(quiz);
                        }}
                      >
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Student: Take Quiz button */}
              {!isFaculty && quiz.published && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                  }
                >
                  View
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Delete confirmation modal */}
      {confirmId && (
        <div
          className="modal d-block"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm delete</h5>
              </div>
              <div className="modal-body">
                Are you sure you want to remove this quiz?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmId(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteQuiz(confirmId)}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close context menu */}
      {contextMenuId && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 999 }}
          onClick={() => setContextMenuId(null)}
        />
      )}
    </div>
  );
}
