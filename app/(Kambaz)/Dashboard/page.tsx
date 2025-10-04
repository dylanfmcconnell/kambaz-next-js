"use client";
import Link from "next/link";
import { Card } from "react-bootstrap";

const courses = [
  { id: "1234", title: "CS1234 React JS", desc: "Full Stack software developer", img: "/images/reactjs.jpg" },
  { id: "0001", title: "LF0001 Walking", desc: "Walker", img: "/images/walk.jpg" },
  { id: "0002", title: "LF0002 Running", desc: "Runner", img: "/images/run.jpg" },
  { id: "0003", title: "LF0003 Sprinting", desc: "Sprinter", img: "/images/sprint.jpg" },
  { id: "0004", title: "LF0004 Jumping", desc: "Jumper", img: "/images/jump.jpg" },
  { id: "0005", title: "LF0005 Robotics", desc: "Robot builder", img: "/images/teslabot.jpg" },
  { id: "0006", title: "LF0006 Flying", desc: "Flyer", img: "/images/fly.jpg" },
  { id: "0007", title: "LF0007 Floating", desc: "Floater", img: "/images/float.jpg" }
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="wd-dashboard-content">
      <h2 id="wd-dashboard-title" className="text-danger mb-1">Dashboard</h2>
      <hr />
      <h4 id="wd-dashboard-published" className="mb-1">Published Courses ({courses.length})</h4>
      <hr />
      <div id="wd-dashboard-courses" className="wd-courses-grid">
        {courses.map((c) => (
          <Link key={c.id} href={`/Courses/${c.id}/Home`} className="wd-dashboard-course-link text-decoration-none">
            <Card className="wd-course-card wd-dashboard-course">
              <Card.Img variant="top" src={c.img} alt={c.title} />
              <Card.Body>
                <Card.Title>{c.title}</Card.Title>
                <Card.Text className="wd-dashboard-course-title">{c.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}