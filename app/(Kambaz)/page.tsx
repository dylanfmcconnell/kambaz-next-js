"use client";

import ProtectedRoute from "./ProtectedRoute";
import Link from "next/link";
import { useSession } from "./Account/Session";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KambazWrapper() {
  const { currentUser, refreshProfile } = useSession();
  const router = useRouter();

  useEffect(() => {
    refreshProfile();
  }, []);

  if (!currentUser) {
    return (
      <div className="mt-4">
        <h2>You must sign in to access Kambaz</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push("/Account/Signin")}
        >
          Go to Signin
        </button>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {currentUser.firstName}</h1>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <Link href="/Dashboard">Dashboard</Link>
          </li>
          <li className="list-group-item">
            <Link href="/Account/Profile">Profile</Link>
          </li>
          <li className="list-group-item">
            <Link href="/Courses">My Courses</Link>
          </li>
          <li className="list-group-item">
            <Link href="/Courses/All">All Courses</Link>
          </li>
        </ul>
      </div>
    </ProtectedRoute>
  );
}
