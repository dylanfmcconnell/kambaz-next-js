"use client";

import { useSession } from "./Session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { currentUser, initializing } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !currentUser) {
      router.push("/Account/Signin");
    }
  }, [initializing, currentUser, router]);

  if (initializing) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // redirect in progress
    return null;
  }

  return <>{children}</>;
}
