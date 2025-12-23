"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "./client";

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  const onChangeA = (e: React.ChangeEvent<HTMLInputElement>) =>
    setA(e.target.value);
  const onChangeB = (e: React.ChangeEvent<HTMLInputElement>) =>
    setB(e.target.value);

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>
      <FormControl
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        defaultValue={a}
        onChange={onChangeA}
      />
      <FormControl
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        defaultValue={b}
        onChange={onChangeB}
      />

      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
      >
        Add {a} + {b}
      </a>

      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
      >
        Subtract {a} - {b}
      </a>

      <hr />
    </div>
  );
}