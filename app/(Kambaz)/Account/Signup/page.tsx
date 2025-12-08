"use client";

import { useState } from "react";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { useSession } from "../Session";

export default function SignupPage() {
  const router = useRouter();
  const { setCurrentUser } = useSession();

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const signup = async () => {
  if (!form.username || !form.password) {
    alert("Username and password are required");
    return;
  }

  try {
    const user = await client.signup(form);
    setCurrentUser(user);
    router.push("/Dashboard");
  } catch (err) {
    alert("Signup failed — username may already be taken.");
  }
};


  return (
    <div>
      <h1>Signup</h1>

      {Object.keys(form).map(field => (
        <input
          key={field}
          placeholder={field}
          className="form-control mb-2"
          value={(form as Record<string, string>)[field]}
          onChange={e => updateField(field, e.target.value)}
        />
      ))}

      <button onClick={signup} className="btn btn-primary w-100 mt-2">
        Signup
      </button>
    </div>
  );
}
