"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: 480 }}>
      <h1>Sign up</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="alice" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="123" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>First name</Form.Label>
          <Form.Control placeholder="Alice" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Last name</Form.Label>
          <Form.Control placeholder="Wonderland" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="alice@wonderland.com" />
        </Form.Group>
        <Button className="w-100 mb-2">Signup</Button>
        <div className="text-center">
          <Link href="/Account/Signin">Signin</Link>
        </div>
      </Form>
    </div>
  );
}
