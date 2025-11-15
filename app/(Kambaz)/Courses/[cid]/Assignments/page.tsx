"use client";

import ProtectedRoute from "../../../ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "./client";
import type { Assignment } from "./client";

export default function AssignmentsWrapper({
  params
}: {
  params: { cid: string };
}) {
  const courseId = params.cid;
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const load = async () => {
    const data = await client.fetchAssignments(courseId);
    setAssignments(data);
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const createAssignment = async () => {
    const newA = await client.createAssignment(courseId, {
      title: "New Assignment",
      description: "",
      due: "",
      completed: false
    });
    setAssignments([...assignments, newA]);
  };

  const deleteA = async (assignment: Assignment) => {
    await client.deleteAssignment(assignment._id);
    setAssignments(assignments.filter(a => a._id !== assignment._id));
  };

  const updateA = async (
    assignment: Assignment,
    updates: Partial<Assignment>
  ) => {
    const updated = await client.updateAssignment(
      assignment._id,
      updates
    );
    setAssignments(
      assignments.map(a => (a._id === assignment._id ? updated : a))
    );
  };

  const toggleCompleted = async (a: Assignment) => {
    await updateA(a, { completed: !a.completed });
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Assignments</h1>

        <Link
          href={`/Courses/${courseId}/Modules`}
          className="btn btn-secondary mb-3"
        >
          Back to Modules
        </Link>

        <button onClick={createAssignment} className="btn btn-success mb-3">
          Add Assignment
        </button>

        <ul className="list-group">
          {assignments.map(a => (
            <li
              key={a._id}
              className="list-group-item d-flex flex-column gap-2"
            >
              <div className="d-flex justify-content-between align-items-center">
                <input
                  className="form-control w-50"
                  defaultValue={a.title}
                  onBlur={e => updateA(a, { title: e.target.value })}
                />

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteA(a)}
                >
                  Delete
                </button>
              </div>

              <textarea
                className="form-control"
                defaultValue={a.description}
                onBlur={e => updateA(a, { description: e.target.value })}
              />

              <div className="d-flex justify-content-between">
                <input
                  className="form-control w-50"
                  type="date"
                  defaultValue={a.due}
                  onBlur={e => updateA(a, { due: e.target.value })}
                />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={a.completed}
                    onChange={() => toggleCompleted(a)}
                  />
                  <label className="form-check-label ms-1">Completed</label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
