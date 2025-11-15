"use client";

import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import HttpClient from "./HttpClient";
import { HTTP_SERVER } from "./client";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>

      <div className="list-group mb-3">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item list-group-item-action"
        >
          Welcome
        </a>
      </div>

      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArrays />
      <WorkingWithArraysAsynchronously />
      <HttpClient />
    </div>
  );
}