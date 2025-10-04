"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor({ params }: { params: { cid: string; aid: string } }) {
  const { cid, aid } = params;
  return (
    <div id="wd-assignment-editor" className="container">
      <h2 className="mb-3">Edit Assignment</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={`A${aid}`} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. Include: links to each of the screens, a link to your GitHub repository, a link to the Kanbaz application, lists of all relevant source code repositories, and the Kanbaz application should include a link to navigate back to the landing page."
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={100} />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Letter Grade</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Online Entry Options</Form.Label>
          <div><Form.Check type="checkbox" label="Text Entry" /></div>
          <div><Form.Check type="checkbox" label="Website URL" defaultChecked /></div>
          <div><Form.Check type="checkbox" label="Media Recordings" /></div>
          <div><Form.Check type="checkbox" label="Student Annotation" /></div>
          <div><Form.Check type="checkbox" label="File Uploads" /></div>
        </Form.Group>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Assign to</Form.Label>
              <Form.Select defaultValue="Everyone">
                <option>Everyone</option>
                <option>Section S101</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Due</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Available from</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">Cancel</Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-primary">Save</Link>
        </div>
      </Form>
    </div>
  );
}
