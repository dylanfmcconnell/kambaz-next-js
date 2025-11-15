"use client";

import { useState } from "react";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { useSession } from "../Session";

export default function SigninPage() {
  const router = useRouter();
  const { setCurrentUser } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signin = async () => {
    try {
      const user = await client.signin({ username, password });
      setCurrentUser(user);
      router.push("/Kambaz");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <input
        placeholder="username"
        className="form-control mb-2"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        className="form-control mb-2"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={signin} className="btn btn-primary w-100 mt-2">
        Signin
      </button>

      <button
        onClick={() => router.push("/Account/Signup")}
        className="btn btn-link w-100 mt-2"
      >
        Signup
      </button>
    </div>
  );
}
