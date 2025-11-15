"use client";

import { useSession } from "./Account/Session";
import * as client from "./Account/client";
import { useRouter } from "next/navigation";

export default function KambazLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, setCurrentUser } = useSession();
  const router = useRouter();

  const signout = async () => {
    await client.signout();
    setCurrentUser(null);
    router.push("/Account/Signin");
  };

  return (
    <div className="container mt-4">
      {currentUser && (
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-danger" onClick={signout}>
            Signout
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
