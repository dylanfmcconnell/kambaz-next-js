"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  const onChangeA = (e: React.ChangeEvent<HTMLInputElement>) =>
    setA(e.target.value);
  const onChangeB = (e: React.ChangeEvent<HTMLInputElement>) =>
    setB(e.target.value);

  const base = `${HTTP_SERVER}/lab5/calculator`;

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      <FormControl
        className="mb-2"
        id="wd-query-parameter-a"
        type="number"
        defaultValue={a}
        onChange={onChangeA}
      />
      <FormControl
        className="mb-2"
        id="wd-query-parameter-b"
        type="number"
        defaultValue={b}
        onChange={onChangeB}
      />

      <a
        id="wd-query-parameter-add"
        className="btn btn-primary me-2"
        href={`${base}?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>

      <a
        id="wd-query-parameter-subtract"
        className="btn btn-danger"
        href={`${base}?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract {a} - {b}
      </a>

      {/* "On your own" multiply/divide links would go here if you want to add them. */}

      <hr />
    </div>
  );
}