"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AccountState {
  accountReducer: { currentUser: { _id: string } | null };
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentUser = useSelector(
    (state: AccountState) => state.accountReducer.currentUser
  );
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);
  if (!currentUser) {
    return null;
  }
  return <>{children}</>;
}