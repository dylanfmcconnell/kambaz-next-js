"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { Course } from "../../Database/types";

type RootCourses = { coursesReducer: { courses: Course[] } };

export default function Course() {
  const params = useParams();
  const { cid } = params as { cid: string };
  const courses = useSelector((s: RootCourses) => s.coursesReducer.courses);
  const course = courses.find((course) => course._id === cid);
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div id="wd-course">
      <h1>{course.name}</h1>
      <div className="list-group">
        <Link className="list-group-item" href={`/Courses/${cid}/Home`}>
          Home
        </Link>
        <Link className="list-group-item" href={`/Courses/${cid}/Modules`}>
          Modules
        </Link>
        <Link className="list-group-item" href={`/Courses/${cid}/Assignments`}>
          Assignments
        </Link>
      </div>
    </div>
  );
}