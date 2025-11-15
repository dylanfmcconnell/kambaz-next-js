"use client";

import { HTTP_SERVER } from "./client";

export default function EnvironmentVariables() {
  return (
    <div id="wd-environment-variables">
      <h3>Environment Variables</h3>
      <p>Remote Server: {HTTP_SERVER}</p>
      <hr />
    </div>
  );
}