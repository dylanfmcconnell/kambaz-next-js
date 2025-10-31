"use client";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../reducer";
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type BasicUser = {
  _id: string;
  role?: "ADMIN" | "FACULTY" | "STUDENT";
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
} & Record<string, unknown>;

type AccountState = { accountReducer: { currentUser: BasicUser | null } };

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: AccountState) => state.accountReducer.currentUser
  );
  const [user, setUser] = useState<BasicUser | null>(currentUser ?? null);

  useEffect(() => {
    if (!currentUser) router.push("/Account/Signin");
  }, [currentUser, router]);

  if (!currentUser || !user) return null;

  return (
    <div id="wd-profile-screen" style={{ maxWidth: 520 }}>
      <h1>Profile</h1>
      <FormControl
        className="mb-2"
        placeholder="username"
        value={user.username ?? ""}
        onChange={(e) =>
          setUser({ ...user, username: (e.target as HTMLInputElement).value })
        }
      />
      <FormControl
        className="mb-2"
        placeholder="password"
        type="password"
        value={user.password ?? ""}
        onChange={(e) =>
          setUser({ ...user, password: (e.target as HTMLInputElement).value })
        }
      />
      <FormControl
        className="mb-2"
        placeholder="First name"
        value={(user.firstName as string | undefined) ?? ""}
        onChange={(e) =>
          setUser({ ...user, firstName: (e.target as HTMLInputElement).value })
        }
      />
      <FormControl
        className="mb-2"
        placeholder="Last name"
        value={(user.lastName as string | undefined) ?? ""}
        onChange={(e) =>
          setUser({ ...user, lastName: (e.target as HTMLInputElement).value })
        }
      />
      <button
        className="btn btn-primary"
        id="wd-update-profile-click"
        onClick={() => dispatch(updateCurrentUser(user))}
      >
        Update
      </button>
    </div>
  );
}