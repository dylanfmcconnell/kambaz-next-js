"use client";
import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import type { Course } from "../../Database/types";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams<{ cid: string }>();
  const course: Course | undefined = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses" className="container-fluid">
      <div className="text-danger d-flex align-items-center gap-3 mb-3">
        <FaAlignJustify className="fs-4" />
        <h2 className="fs-1 m-0">{course?.name}</h2>
      </div>

      <div className="row">
        <div className="col-12 col-md-3 col-lg-2">
          <CourseNavigation />
        </div>
        <div className="col-12 col-md-9 col-lg-10">
          {children}
        </div>
      </div>
    </div>
  );
}
