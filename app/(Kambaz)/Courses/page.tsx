"use client";

import ProtectedRoute from "../ProtectedRoute";
import { useEffect, useState } from "react";
import * as client from "./client";
import type { Course } from "./client";
import { useRouter } from "next/navigation";

export default function CoursesWrapper() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const load = async () => {
    const data = await client.fetchMyCourses();
    setCourses(data);
  };

  useEffect(() => {
    load();
  }, []);

  const createCourse = async () => {
    const newCourse = await client.createCourse({
      name: "New Course",
      number: "XXX0000",
      startDate: "",
      endDate: "",
      department: "",
      credits: 0,
      description: ""
    });
    setCourses([...courses, newCourse]);
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>My Courses</h1>

        <button onClick={createCourse} className="btn btn-success mb-3">
          Add Course
        </button>

        <ul className="list-group">
          {courses.map(course => (
            <li
              key={course._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{course.name}</strong>
                <div className="text-muted">{course.number}</div>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={async () => {
                  await client.deleteCourse(course._id);
                  setCourses(courses.filter(c => c._id !== course._id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
