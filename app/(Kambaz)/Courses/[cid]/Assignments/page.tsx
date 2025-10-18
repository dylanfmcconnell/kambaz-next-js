"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import { assignments } from "../../../Database";
import type { Assignment } from "../../../Database/types";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const items: Assignment[] = assignments.filter((a) => a.course === cid);
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="m-0">Assignments</h3>
        <Button variant="danger">+ Assignment</Button>
      </div>
      <ListGroup className="rounded-0">
        {items.map((a) => (
          <ListGroupItem key={a._id} className="d-flex justify-content-between align-items-center">
            <div>
              <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="fw-bold text-decoration-none">
                {a.title}
              </Link>
              <div className="text-secondary">{a.description}</div>
            </div>
            <div className="text-nowrap">{a.points} pts</div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
