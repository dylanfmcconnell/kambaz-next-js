import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../Database";
import type { Course } from "../Database/types";

export interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: db.courses as Course[],
};

type AddPayload = Pick<Course, "name" | "description">;
type UpdatePayload = Course;
type IdPayload = string;

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload }: PayloadAction<AddPayload>) => {
      const newCourse: Course = {
        _id: Date.now().toString(),
        name: payload.name,
        description: payload.description,
      } as Course;
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload }: PayloadAction<IdPayload>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
    updateCourse: (state, { payload }: PayloadAction<UpdatePayload>) => {
      state.courses = state.courses.map((c) => (c._id === payload._id ? payload : c));
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;