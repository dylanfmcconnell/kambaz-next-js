"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";
import type { Assignment } from "./client";
import { FormControl, FormCheck } from "react-bootstrap";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  const fetchAssignment = async () => {
    const data = await client.fetchAssignment();
    setAssignment(data);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  if (!assignment) {
    return (
      <div id="wd-asynchronous-objects">
        <h3>Working with Objects Asynchronously</h3>
        <p>Loading assignment...</p>
      </div>
    );
  }

  const updateTitleClick = async () => {
    const updated = await client.updateTitle(assignment.title);
    setAssignment(updated);
  };

  const updateField =
    (field: keyof Assignment) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "completed" ? e.target.checked : (e.target.value as any);
      setAssignment({ ...assignment, [field]: value } as Assignment);
    };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>

      <h4>Assignment</h4>

      <FormControl
        className="mb-2"
        defaultValue={assignment.title}
        onChange={updateField("title")}
      />
      <FormControl
        className="mb-2"
        defaultValue={assignment.description}
        onChange={updateField("description")}
      />
      <FormControl
        className="mb-2"
        defaultValue={assignment.due}
        onChange={updateField("due")}
      />

      <FormCheck
        id="wd-completed"
        label="Completed"
        defaultChecked={assignment.completed}
        onChange={updateField("completed")}
      />

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={updateTitleClick}
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}