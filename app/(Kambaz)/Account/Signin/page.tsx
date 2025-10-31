"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../reducer";
import { useRouter } from "next/navigation";

type AccountState = {
  accountReducer: { currentUser: { _id: string } | null };
};

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector(
    (state: AccountState) => state.accountReducer.currentUser
  );

  const doSignin = () => {
    dispatch(signin({ username, password }));
  };

  if (currentUser) {
    router.push("/Account/Profile");
    return null;
  }

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 420 }}>
      <h1>Sign in</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={username}
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
      />
      <button
        id="wd-signin-btn"
        onClick={doSignin}
        className="btn btn-primary w-100 mb-2"
      >
        Signin
      </button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Signup
      </Link>
      <div className="mt-3">
        <Link id="wd-labs-link" href="/Labs">
          Go to Labs
        </Link>
      </div>
    </div>
  );
}