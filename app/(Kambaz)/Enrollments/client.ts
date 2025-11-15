"use server";

import api from "@/app/lib/api";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export const enroll = async (courseId: string): Promise<void> => {
  await api.post("/api/enrollments", { course: courseId });
};
