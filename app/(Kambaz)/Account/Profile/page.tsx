"use client";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: 640 }}>
      <h1>Profile</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>First name</Form.Label>
          <Form.Control defaultValue="Alice" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Last name</Form.Label>
          <Form.Control defaultValue="Wonderland" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control type="date" defaultValue="2001-01-01" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" defaultValue="alice@wonderland.com" />
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="danger">Signout</Button>
        </div>
      </Form>
    </div>
  );
}
