"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./Session";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, initializing } = useSession();

  useEffect(() => {
    if (initializing) return;
    
    if (currentUser) {
      router.replace("/Account/Profile");
    } else {
      router.replace("/Account/Signin");
    }
  }, [currentUser, initializing, router]);

  return <div>Loading...</div>;
}
