"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import ProtectedRoute from "../Account/ProtectedRoute";
import { useSession } from "../Account/Session";
import * as coursesClient from "../Courses/client";
import type { Course } from "../Courses/client";
import Image from "next/image";

export default function Dashboard() {
  const { currentUser } = useSession();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [showAll, setShowAll] = useState(false);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [draftName, setDraftName] = useState("New Course");
  const [draftDescription, setDraftDescription] = useState("New Description");
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      const all = await coursesClient.fetchAllCourses();
      setAllCourses(all);
      const enrolled = await coursesClient.fetchMyCourses();
      setMyCourses(enrolled);
    } catch {
      setAllCourses([]);
      setMyCourses([]);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const isEnrolled = (courseId: string) =>
    !!myCourses.find((c) => c._id === courseId);

  const visibleCourses = (() => {
    if (isFaculty || showAll) return allCourses;
    return myCourses;
  })();

  const onAdd = async () => {
    try {
      await coursesClient.createCourse({
        name: draftName,
        description: draftDescription,
      });
      await loadCourses();
    } catch (err) {
      console.error("Failed to add course", err);
    }
  };

  const onUpdate = async () => {
    if (!editingId) return;
    try {
      await coursesClient.updateCourse(editingId, {
        name: draftName,
        description: draftDescription,
      });
      setEditingId(null);
      await loadCourses();
    } catch (err) {
      console.error("Failed to update course", err);
    }
  };

  const onEdit = (c: Course) => {
    setEditingId(c._id);
    setDraftName(c.name);
    setDraftDescription(c.description ?? "");
  };

  const onDelete = async (id: string) => {
    try {
      await coursesClient.deleteCourse(id);
      await loadCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await coursesClient.enrollIntoCourse(currentUser._id, courseId);
      await loadCourses();
    } catch (err) {
      console.error("Failed to enroll", err);
    }
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await coursesClient.unenrollFromCourse(currentUser._id, courseId);
      await loadCourses();
    } catch (err) {
      console.error("Failed to unenroll", err);
    }
  };

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
              placeholder="Course Name"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
            />
            <textarea
              className="form-control"
              rows={3}
              placeholder="Course Description"
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
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
                              onUnenroll(c._id);
                            } else {
                              onEnroll(c._id);
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
