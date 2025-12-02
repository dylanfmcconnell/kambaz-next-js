import api from "@/app/lib/api";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

export const fetchAllCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/api/courses");
  return response.data;
};

export const fetchMyCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/api/users/current/courses");
  return response.data;
};

export const createCourse = async (
  course: Partial<Course>
): Promise<Course> => {
  const response = await api.post<Course>("/api/courses", course);
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/api/courses/${courseId}`);
};

export const updateCourse = async (
  courseId: string,
  updates: Partial<Course>
): Promise<Course> => {
  const response = await api.put<Course>(
    `/api/courses/${courseId}`,
    updates
  );
  return response.data;
};

export const enrollIntoCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await api.post(`/api/users/${userId}/courses/${courseId}`);
};

export const unenrollFromCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await api.delete(`/api/users/${userId}/courses/${courseId}`);
};

export const findUsersForCourse = async (courseId: string): Promise<any[]> => {
  const response = await api.get(`/api/courses/${courseId}/users`);
  return response.data;
};
