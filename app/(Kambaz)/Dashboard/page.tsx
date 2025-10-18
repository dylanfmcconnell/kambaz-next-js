"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { courses } from "../Database";
import type { Course } from "../Database/types";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <Row xs={1} md={3} className="g-4">
        {courses.map((course: Course) => (
          <Col key={course._id}>
            <Link
              href={`/Courses/${course._id}/Home`}
              className="wd-dashboard-course-link text-decoration-none text-dark"
            >
              <Card className="wd-dashboard-course" style={{ width: "300px" }}>
                <img
                  src="/images/reactjs.jpg"
                  className="card-img-top"
                  width="100%"
                  height={100}
                  alt="course"
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
