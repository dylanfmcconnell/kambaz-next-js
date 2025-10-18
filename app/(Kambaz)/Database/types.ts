export type Course = {
  _id: string;
  name: string;
  description?: string;
};

export type Lesson = {
  _id: string;
  name: string;
};

export type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
};

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string | number;
};

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};
