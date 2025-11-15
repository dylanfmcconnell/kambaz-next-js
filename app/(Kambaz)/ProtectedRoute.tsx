"use client";

import { useSession } from "./Account/Session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { currentUser, refreshProfile } = useSession();
  const router = useRouter();

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
