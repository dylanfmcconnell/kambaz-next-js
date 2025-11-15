"use server";

import api from "@/app/lib/api";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  due: string;
  completed: boolean;
}

export const fetchAssignments = async (
  courseId: string
): Promise<Assignment[]> => {
  const response = await api.get<Assignment[]>(
    `/api/courses/${courseId}/assignments`
  );
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const response = await api.post<Assignment>(
    `/api/courses/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (
  assignmentId: string
): Promise<void> => {
  await api.delete(`/api/assignments/${assignmentId}`);
};

export const updateAssignment = async (
  assignmentId: string,
  updates: Partial<Assignment>
): Promise<Assignment> => {
  const response = await api.put<Assignment>(
    `/api/assignments/${assignmentId}`,
    updates
  );
  return response.data;
};
