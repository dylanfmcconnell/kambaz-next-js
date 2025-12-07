"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";
import type { Quiz, QuizAttempt } from "../client";
import { useSession } from "../../../../Account/Session";

export default function QuizDetails() {
  const router = useRouter();
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const { currentUser } = useSession();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client.fetchQuiz(qid);
      setQuiz(data);

      // For students, also load their attempts
      if (currentUser && currentUser.role === "STUDENT") {
        const attempts = await client.fetchAttempts(qid);
        setAttemptCount(attempts.length);
        if (attempts.length > 0) {
          setLatestAttempt(attempts[0]); // Sorted by attemptNumber desc
        }
      }
    } catch (err) {
      console.error("Failed to load quiz", err);
    } finally {
      setLoading(false);
    }
  }, [qid, currentUser]);

  useEffect(() => {
    if (qid && currentUser) loadQuiz();
  }, [qid, currentUser, loadQuiz]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString();
  };

  const formatQuizType = (type: string) => {
    const types: Record<string, string> = {
      GRADED_QUIZ: "Graded Quiz",
      PRACTICE_QUIZ: "Practice Quiz",
      GRADED_SURVEY: "Graded Survey",
      UNGRADED_SURVEY: "Ungraded Survey"
    };
    return types[type] || type;
  };

  const formatAssignmentGroup = (group: string) => {
    const groups: Record<string, string> = {
      QUIZZES: "Quizzes",
      EXAMS: "Exams",
      ASSIGNMENTS: "Assignments",
      PROJECT: "Project"
    };
    return groups[group] || group;
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    if (isFaculty) return true; // Faculty can preview

    // Check if quiz is available
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableFrom && now < availableFrom) return false;
    if (availableUntil && now > availableUntil) return false;

    // Check attempt limits
    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    if (attemptCount >= maxAttempts) return false;

    return true;
  };

  const handleStartQuiz = async () => {
    try {
      const attempt = await client.startAttempt(qid);
      router.push(`/Courses/${cid}/Quizzes/${qid}/Take?attemptId=${attempt._id}`);
    } catch (err) {
      console.error("Failed to start quiz", err);
      alert("Unable to start quiz. You may have reached the maximum number of attempts.");
    }
  };

  const togglePublish = async () => {
    if (!quiz) return;
    try {
      if (quiz.published) {
        await client.unpublishQuiz(qid);
      } else {
        await client.publishQuiz(qid);
      }
      setQuiz({ ...quiz, published: !quiz.published });
    } catch (err) {
      console.error("Failed to toggle publish", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div className="alert alert-danger">Quiz not found</div>;
  }

  return (
    <div id="wd-quiz-details">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>{quiz.title}</h2>
        <div>
          {isFaculty && (
            <>
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${qid}/Take?preview=true`)
                }
              >
                Preview
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`)
                }
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quiz status and publish button for faculty */}
      {isFaculty && (
        <div className="mb-3 d-flex align-items-center gap-3">
          <span
            className={`badge ${quiz.published ? "bg-success" : "bg-secondary"}`}
          >
            {quiz.published ? "Published" : "Not Published"}
          </span>
          <button
            className={`btn btn-sm ${quiz.published ? "btn-warning" : "btn-success"}`}
            onClick={togglePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}

      {/* Quiz Properties Table */}
      <table className="table">
        <tbody>
          <tr>
            <td className="text-end" style={{ width: "200px" }}>
              <strong>Quiz Type</strong>
            </td>
            <td>{formatQuizType(quiz.quizType)}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Points</strong>
            </td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Assignment Group</strong>
            </td>
            <td>{formatAssignmentGroup(quiz.assignmentGroup)}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Shuffle Answers</strong>
            </td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Time Limit</strong>
            </td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Multiple Attempts</strong>
            </td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end">
                <strong>How Many Attempts</strong>
              </td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="text-end">
              <strong>Show Correct Answers</strong>
            </td>
            <td>{quiz.showCorrectAnswers === "immediately" ? "Immediately" : quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Access Code</strong>
            </td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>One Question at a Time</strong>
            </td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Webcam Required</strong>
            </td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Lock Questions After Answering</strong>
            </td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      {/* Dates Table */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableFrom)}</td>
            <td>{formatDate(quiz.availableUntil)}</td>
          </tr>
        </tbody>
      </table>

      {/* Student: Show attempts and take quiz button */}
      {!isFaculty && (
        <div className="mt-4">
          {latestAttempt && latestAttempt.submitted && (
            <div className="alert alert-info">
              <strong>Your Last Attempt:</strong> Score: {latestAttempt.score} /{" "}
              {latestAttempt.totalPoints}
              <br />
              <button
                className="btn btn-link p-0"
                onClick={() =>
                  router.push(
                    `/Courses/${cid}/Quizzes/${qid}/Results?attemptId=${latestAttempt._id}`
                  )
                }
              >
                View Results
              </button>
            </div>
          )}

          {quiz.multipleAttempts && (
            <p>
              Attempts used: {attemptCount} / {quiz.howManyAttempts}
            </p>
          )}

          {canTakeQuiz() ? (
            <button className="btn btn-danger btn-lg" onClick={handleStartQuiz}>
              {attemptCount > 0 ? "Retake Quiz" : "Start Quiz"}
            </button>
          ) : (
            <div className="alert alert-warning">
              {attemptCount >= (quiz.multipleAttempts ? quiz.howManyAttempts : 1)
                ? "You have used all your attempts for this quiz."
                : "This quiz is not currently available."}
            </div>
          )}
        </div>
      )}

      {/* Back button */}
      <div className="mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}
