import api from "@/app/lib/api";

export interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: { _id: string; name: string; description: string }[];
}

export const fetchModules = async (courseId: string): Promise<Module[]> => {
  const response = await api.get<Module[]>(
    `/api/courses/${courseId}/modules`
  );
  return response.data;
};

export const createModule = async (
  courseId: string,
  module: Partial<Module>
): Promise<Module> => {
  const response = await api.post<Module>(
    `/api/courses/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (
  courseId: string,
  moduleId: string
): Promise<void> => {
  await api.delete(`/api/courses/${courseId}/modules/${moduleId}`);
};

export const updateModule = async (
  courseId: string,
  moduleId: string,
  updates: Partial<Module>
): Promise<Module> => {
  const response = await api.put<Module>(
    `/api/courses/${courseId}/modules/${moduleId}`,
    updates
  );
  return response.data;
};
