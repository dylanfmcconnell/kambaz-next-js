"use client";

import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as coursesClient from "../Courses/client";
import type { Course } from "../Courses/client";

export default function DashboardWrapper() {
  const [courses, setCourses] = useState<Course[]>([]);

  const load = async () => {
    try {
      const enrolled = await coursesClient.fetchMyCourses();
      setCourses(enrolled);
    } catch {
      setCourses([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>

        <Link href="/Kambaz" className="btn btn-secondary mb-3">Back</Link>

        <div className="list-group mt-3">
          {courses.map(course => (
            <div 
              key={course._id}
              className="list-group-item d-flex justify-content-between">
              <span>{course.name}</span>
              <span className="badge bg-primary">{course.number}</span>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
