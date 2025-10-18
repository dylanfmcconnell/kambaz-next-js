"use client";
import { useParams } from "next/navigation";
import { assignments } from "../../../../Database";
import type { Assignment } from "../../../../Database/types";
import Link from "next/link";
import Form from "react-bootstrap/Form";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment: Assignment | undefined = assignments.find((a) => a._id === aid && a.course === cid);

  return (
    <div id="wd-assignment-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">{assignment?.title}</h3>
        <div>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light me-2">Cancel</Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment?.title} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={6} defaultValue={assignment?.description} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" defaultValue={assignment?.points} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control type="datetime-local" defaultValue={assignment?.due} />
        </Form.Group>

        <div className="d-flex gap-3">
          <Form.Group className="flex-fill">
            <Form.Label>Available from</Form.Label>
            <Form.Control type="datetime-local" defaultValue={assignment?.availableFrom} />
          </Form.Group>
          <Form.Group className="flex-fill">
            <Form.Label>Until</Form.Label>
            <Form.Control type="datetime-local" defaultValue={assignment?.availableUntil} />
          </Form.Group>
        </div>

        <div className="mt-4">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light me-2">Cancel</Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </Form>
    </div>
  );
}
