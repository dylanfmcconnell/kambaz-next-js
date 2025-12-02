"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useSession } from "../Session";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { currentUser, setCurrentUser } = useSession();

  const doSignin = async () => {
    try {
      const user = await client.signin({ username, password });
      setCurrentUser(user);
      router.push("/Dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  if (currentUser) {
    router.push("/Dashboard");
    return null;
  }

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 420 }}>
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}
