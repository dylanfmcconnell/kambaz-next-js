"use client";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Enrollment, Course } from "../../Database/types";

type AccountState = {
  accountReducer: {
    currentUser:
      | { _id: string; role?: "ADMIN" | "FACULTY" | "STUDENT" }
      | null;
  };
};
type RootEnrollments = { enrollmentsReducer: { enrollments: Enrollment[] } };
type RootCourses = { coursesReducer: { courses: Course[] } };

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const { cid } = params as { cid: string };

  const currentUser = useSelector(
    (s: AccountState) => s.accountReducer.currentUser
  );
  const enrollments = useSelector(
    (s: RootEnrollments) => s.enrollmentsReducer.enrollments
  );
  const courses = useSelector((s: RootCourses) => s.coursesReducer.courses);

  const courseExists = courses.some((c) => c._id === cid);
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const enrolled =
    !!currentUser &&
    enrollments.some((e) => e.user === currentUser._id && e.course === cid);

  useEffect(() => {
    if (!courseExists) {
      router.replace("/Dashboard");
      return;
    }
    if (!currentUser) {
      router.replace("/Account/Signin");
      return;
    }
    if (!isFaculty && !enrolled) {
      router.replace("/Dashboard");
    }
  }, [courseExists, currentUser, isFaculty, enrolled, router]);

  if (!courseExists || !currentUser || (!isFaculty && !enrolled)) {
    return null;
  }
  return <>{children}</>;
}