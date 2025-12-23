"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function WorkingWithObjects() {
  const [newTitle, setNewTitle] = useState("NodeJS Assignment");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.target.value);

  const assignmentUrl = `${HTTP_SERVER}/lab5/assignment`;
  const titleUrl = `${HTTP_SERVER}/lab5/assignment/title`;
  const updateTitleUrl = `${HTTP_SERVER}/lab5/assignment/title/${encodeURIComponent(
    newTitle
  )}`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={assignmentUrl}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={titleUrl}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={updateTitleUrl}
      >
        Update Title
      </a>
      <FormControl
        id="wd-assignment-title"
        className="w-75"
        defaultValue={newTitle}
        onChange={handleChange}
      />
      <hr />
    </div>
  );
}