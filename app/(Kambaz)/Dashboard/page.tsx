"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enroll, unenroll } from "../Enrollments/reducer";
import ProtectedRoute from "../Account/ProtectedRoute";
import type { Course, Enrollment } from "../Database/types";
import Image from "next/image";

type AccountState = {
  accountReducer: {
    currentUser:
      | { _id: string; role?: "ADMIN" | "FACULTY" | "STUDENT"; username?: string }
      | null;
  };
};
type RootCourses = { coursesReducer: { courses: Course[] } };
type RootEnrollments = { enrollmentsReducer: { enrollments: Enrollment[] } };

export default function Dashboard() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (s: AccountState) => s.accountReducer.currentUser
  );
  const courses = useSelector((s: RootCourses) => s.coursesReducer.courses);
  const enrollments = useSelector(
    (s: RootEnrollments) => s.enrollmentsReducer.enrollments
  );

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [showAll, setShowAll] = useState(false);

  const [draftName, setDraftName] = useState("New Course");
  const [draftDescription, setDraftDescription] = useState("New Description");
  const [editingId, setEditingId] = useState<string | null>(null);

  const isEnrolled = (courseId: string) =>
    !!enrollments.find(
      (e) => e.user === currentUser?._id && e.course === courseId
    );

  const visibleCourses = (() => {
    if (isFaculty || showAll) return courses;
    return courses.filter((c) => isEnrolled(c._id));
  })();

  const onAdd = () =>
    dispatch(addCourse({ name: draftName, description: draftDescription }));
  const onUpdate = () => {
    if (!editingId) return;
    const course = courses.find((c) => c._id === editingId);
    if (!course) return;
    dispatch(
      updateCourse({ ...course, name: draftName, description: draftDescription })
    );
    setEditingId(null);
  };
  const onEdit = (c: Course) => {
    setEditingId(c._id);
    setDraftName(c.name);
    setDraftDescription(c.description ?? "");
  };
  const onDelete = (id: string) => dispatch(deleteCourse(id));

  return (
    <ProtectedRoute>
      <div id="wd-dashboard">
        <div className="d-flex align-items-center justify-content-between">
          <h1 id="wd-dashboard-title">Dashboard</h1>
          {!isFaculty && currentUser && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAll((v) => !v)}
              id="wd-enrollments-toggle"
            >
              {showAll ? "Show Enrolled Only" : "Enrollments"}
            </button>
          )}
        </div>

        {isFaculty && (
          <div>
            <h5>New Course</h5>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdate}
              id="wd-update-course-click"
              disabled={!editingId}
            >
              Update
            </button>
            <button
              className="btn btn-primary float-end"
              onClick={onAdd}
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <div className="mb-2"></div>
            <input
              className="form-control mb-2"
              value={draftName}
              onChange={(e) => setDraftName((e.target as HTMLInputElement).value)}
            />
            <textarea
              className="form-control"
              rows={3}
              value={draftDescription}
              onChange={(e) =>
                setDraftDescription((e.target as HTMLTextAreaElement).value)
              }
            />
          </div>
        )}

        <h2 id="wd-dashboard-published">
          Published Courses ({visibleCourses.length})
        </h2>

        <div id="wd-dashboard-courses">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {visibleCourses.map((c) => {
              const enrolled = isEnrolled(c._id);
              return (
                <div className="col" key={c._id} style={{ width: "300px" }}>
                  <div className="card">
                    <Image
                      src="/images/reactjs.jpg"
                      alt="course"
                      className="card-img-top"
                      width={300}
                      height={100}
                      style={{ width: "100%", height: "100px", objectFit: "cover" }}
                      priority
                    />
                    <div className="card-body">
                      <h5 className="card-title text-nowrap overflow-hidden">
                        {c.name}
                      </h5>
                      <p
                        className="card-text overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </p>
                      <Link
                        href={`/Courses/${c._id}/Home`}
                        className="btn btn-primary me-2"
                      >
                        Go
                      </Link>

                      {isFaculty ? (
                        <>
                          <button
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              onEdit(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              onDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : currentUser ? (
                        <button
                          className={`btn ${enrolled ? "btn-danger" : "btn-success"} float-end`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (enrolled) {
                              dispatch(unenroll({ user: currentUser._id, course: c._id }));
                            } else {
                              dispatch(enroll({ user: currentUser._id, course: c._id }));
                            }
                          }}
                          id={enrolled ? "wd-unenroll-click" : "wd-enroll-click"}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
