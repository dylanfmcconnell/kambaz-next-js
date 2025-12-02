"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import { useSession } from "../Session";
import type { User } from "../client";

export default function Profile() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser || !user) return null;

  const save = async () => {
    try {
      const updated = await client.updateUser(user._id, user);
      setCurrentUser(updated);
      alert("Profile updated");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div id="wd-profile-screen" style={{ maxWidth: 520 }}>
      <h1>Profile</h1>
      <FormControl
        className="mb-2"
        placeholder="username"
        value={user.username ?? ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="password"
        type="password"
        value={user.password ?? ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="First name"
        value={user.firstName ?? ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Last name"
        value={user.lastName ?? ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Email"
        type="email"
        value={user.email ?? ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Date of birth"
        type="date"
        value={user.dob ?? ""}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Role"
        value={user.role ?? ""}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      />
      <button
        className="btn btn-primary w-100"
        id="wd-update-profile-click"
        onClick={save}
      >
        Update
      </button>
    </div>
  );
}
