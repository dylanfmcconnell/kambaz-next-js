"use client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup } from "react-bootstrap";

const items = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();
  return (
    <ListGroup className="rounded-0">
      {items.map((label) => {
        const href = `/Courses/${cid}/${label}`;
        const active = pathname === href;
        return (
          <ListGroup.Item key={label}
                          as={Link}
                          href={href}
                          className={`border-0 ${active ? "text-danger bg-light" : ""}`}>
            {label}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
