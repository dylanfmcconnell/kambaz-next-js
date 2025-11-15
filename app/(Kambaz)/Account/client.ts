"use server";

import api from "@/app/lib/api";

export interface User {
  _id: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export const signin = async (credentials: {
  username: string;
  password: string;
}): Promise<User> => {
  const response = await api.post<User>("/api/users/signin", credentials);
  return response.data;
};

export const signup = async (user: Partial<User>): Promise<User> => {
  const response = await api.post<User>("/api/users/signup", user);
  return response.data;
};

export const signout = async (): Promise<void> => {
  await api.post("/api/users/signout");
};

export const profile = async (): Promise<User> => {
  const response = await api.post<User>("/api/users/profile");
  return response.data;
};

export const updateUser = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  const response = await api.put<User>(`/api/users/${userId}`, updates);
  return response.data;
};
