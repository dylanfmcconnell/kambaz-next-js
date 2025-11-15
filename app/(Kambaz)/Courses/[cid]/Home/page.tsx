"use client";

import ModulesWrapper from "../Modules/page";
import CourseStatus from "./Status";

export default function Home({
  params
}: {
  params: { cid: string };
}) {
  return (
    <div id="wd-home">
      <div className="d-flex">
        <div className="flex-fill me-3">
          <ModulesWrapper params={params} />
        </div>
        <div className="d-none d-lg-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
