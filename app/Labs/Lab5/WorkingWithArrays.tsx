"use client";

import React from "react";
import { HTTP_SERVER } from "./client";

export default function WorkingWithArrays() {
  const api = `${HTTP_SERVER}/lab5/todos`;

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary"
        href={api}
      >
        Get Todos
      </a>
      <hr />
      {/* The chapter adds more hyperlinks later; you can extend here if you’d like. */}
    </div>
  );
}