"use client";

import { useEffect, useState } from "react";
import * as client from "../client";
import * as enrollClient from "../../Enrollments/client";
import type { Course } from "../client";

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  const load = async () => {
    setCourses(await client.fetchAllCourses());
    setMyCourses(await client.fetchMyCourses());
  };

  useEffect(() => {
    load();
  }, []);

  const isEnrolled = (courseId: string): boolean =>
    myCourses.some(c => c._id === courseId);

  const enroll = async (courseId: string) => {
    await enrollClient.enroll(courseId);
    await load();
  };

  return (
    <div>
      <h1>All Courses</h1>

      <ul className="list-group mt-3">
        {courses.map(course => (
          <li
            key={course._id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{course.name}</span>

            {isEnrolled(course._id) ? (
              <span className="badge bg-success">Enrolled</span>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => enroll(course._id)}
              >
                Enroll
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
