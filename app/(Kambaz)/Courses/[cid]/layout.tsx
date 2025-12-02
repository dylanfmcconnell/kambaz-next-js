"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "../../Account/Session";
import * as coursesClient from "../client";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const { cid } = params as { cid: string };
  const { currentUser, initializing } = useSession();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      // Wait for session to initialize
      if (initializing) return;

      // If no user, redirect to signin
      if (!currentUser) {
        router.replace("/Account/Signin");
        return;
      }

      const isFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

      // Faculty/Admin can access any course
      if (isFaculty) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // For students, check if enrolled
      try {
        const myCourses = await coursesClient.fetchMyCourses();
        const isEnrolled = myCourses.some((c) => c._id === cid);
        
        if (isEnrolled) {
          setAuthorized(true);
        } else {
          router.replace("/Dashboard");
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
        router.replace("/Dashboard");
      }
      
      setLoading(false);
    };

    checkAccess();
  }, [cid, currentUser, initializing, router]);

  if (initializing || loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <div id="wd-course">
      <Breadcrumb />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
