"use client";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useParams } from "next/navigation";
import { modules } from "../../../Database";
import type { Module } from "../../../Database/types";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const modulesForCourse: Module[] = modules.filter((m) => m.course === cid);
  return (
    <ListGroup id="wd-modules" className="rounded-0">
      {modulesForCourse.map((module) => (
        <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-0">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="me-2 fs-3">{module.name}</div>
            <ModuleControlButtons />
          </div>
          {module.lessons && (
            <ListGroup className="wd-lessons rounded-0">
              {module.lessons.map((lesson) => (
                <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                  <div className="me-2 fs-3">{lesson.name}</div>
                  <LessonControlButtons />
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
