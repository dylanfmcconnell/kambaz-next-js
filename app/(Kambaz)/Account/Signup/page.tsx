"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useSession } from "../Session";

export default function Signup() {
  const router = useRouter();
  const { setCurrentUser } = useSession();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: ""
  });

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const signup = async () => {
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }

    try {
      const user = await client.signup(form);
      setCurrentUser(user);
      router.push("/Dashboard");
    } catch (err) {
      setError("Signup failed — username may already be taken.");
    }
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: 480 }}>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            placeholder="alice" 
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="123" 
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>First name</Form.Label>
          <Form.Control 
            placeholder="Alice" 
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Last name</Form.Label>
          <Form.Control 
            placeholder="Wonderland" 
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control 
            type="date" 
            value={form.dob}
            onChange={(e) => updateField("dob", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="alice@wonderland.com" 
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </Form.Group>
        <Button className="w-100 mb-2" onClick={signup}>Signup</Button>
        <div className="text-center">
          <Link href="/Account/Signin">Signin</Link>
        </div>
      </Form>
    </div>
  );
}
