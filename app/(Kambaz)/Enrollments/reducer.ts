import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../Database";
import type { Enrollment } from "../Database/types";

export interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: db.enrollments as Enrollment[],
};

type TogglePayload = { user: string; course: string };

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: PayloadAction<TogglePayload>) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        state.enrollments = [
          ...state.enrollments,
          { _id: Date.now().toString(), user: payload.user, course: payload.course } as Enrollment,
        ];
      }
    },
    unenroll: (state, { payload }: PayloadAction<TogglePayload>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;