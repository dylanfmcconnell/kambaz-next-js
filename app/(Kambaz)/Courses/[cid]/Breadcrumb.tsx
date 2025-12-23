"use client";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { cid } = useParams<{ cid: string }>();
  const [courseName, setCourseName] = useState<string>("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await coursesClient.fetchAllCourses();
        const course = courses.find((c) => c._id === cid);
        if (course) {
          setCourseName(course.name);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [cid]);

  const currentPage = pathname.split("/").pop() || "Home";

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-danger">{courseName || "Course"}</li>
        <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
      </ol>
    </nav>
  );
}
