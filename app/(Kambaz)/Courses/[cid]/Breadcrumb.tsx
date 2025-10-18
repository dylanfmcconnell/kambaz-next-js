"use client";
import { usePathname } from "next/navigation";
import type { Course } from "../../Database/types";

export default function Breadcrumb({ course }: { course: Course | undefined }) {
  const pathname = usePathname();
  return <span>{course?.name} &gt; {pathname.split("/").pop()}</span>;
}
