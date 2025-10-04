"use client";
import Link from "next/link";
import { InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: 360 }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl placeholder="Search for Assignments" id="wd-search-assignment" />
        </InputGroup>
        <div className="text-end">
          <Button variant="success" className="me-2">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      <h3 id="wd-assignments-title" className="d-flex align-items-center">
        <span className="me-2">ASSIGNMENTS 40% of Total</span>
        <Button size="sm" variant="light">+</Button>
      </h3>

      <ListGroup id="wd-assignment-list" className="mt-2">
        <ListGroup.Item className="wd-assignment-list-item border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none">
            <div className="fw-semibold">A1 — ENV + HTML</div>
            <div className="text-secondary small">Due May 13 at 11:59pm • 100 pts</div>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="wd-assignment-list-item border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link text-decoration-none">
            <div className="fw-semibold">A2 — CSS + Bootstrap</div>
            <div className="text-secondary small">Due May 20 at 11:59pm • 100 pts</div>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="wd-assignment-list-item border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link text-decoration-none">
            <div className="fw-semibold">A3 — React Components</div>
            <div className="text-secondary small">Due May 27 at 11:59pm • 100 pts</div>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
