import api from "@/app/lib/api";

export interface Module {
  _id: string;
  name: string;
  course: string;
}


export const fetchModules = async (
  courseId: string
): Promise<Module[]> => {
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

export const deleteModule = async (moduleId: string): Promise<void> => {
  await api.delete(`/api/modules/${moduleId}`);
};

export const updateModule = async (
  moduleId: string,
  updates: Partial<Module>
): Promise<Module> => {
  const response = await api.put<Module>(
    `/api/modules/${moduleId}`,
    updates
  );
  return response.data;
};