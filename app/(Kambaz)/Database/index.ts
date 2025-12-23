import coursesJson from "./courses.json";
import modulesJson from "./modules.json";
import assignmentsJson from "./assignments.json";
import usersJson from "./users.json";
import enrollmentsJson from "./enrollments.json";

import type { Course, Module, Assignment, User, Enrollment } from "./types";

export const courses: Course[] = coursesJson as Course[];
export const modules: Module[] = modulesJson as Module[];
export const assignments: Assignment[] = assignmentsJson as Assignment[];
export const users: User[] = usersJson as User[];
export const enrollments: Enrollment[] = enrollmentsJson as Enrollment[];

export default { courses, modules, assignments, users, enrollments };
export * from "./types";
