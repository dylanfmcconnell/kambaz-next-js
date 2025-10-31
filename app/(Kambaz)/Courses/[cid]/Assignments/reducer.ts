import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../../../Database";
import type { Assignment } from "../../../Database/types";

export interface AssignmentsState { assignments: Assignment[]; }

const initialState: AssignmentsState = {
  assignments: db.assignments as Assignment[],
};

type AddPayload = Omit<Assignment, "_id">;
type UpdatePayload = Assignment;
type IdPayload = string;

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<AddPayload>) => {
      const newAssignment: Assignment = { ...payload, _id: Date.now().toString() };
      state.assignments = [newAssignment, ...state.assignments];
    },
    deleteAssignment: (state, { payload }: PayloadAction<IdPayload>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
    updateAssignment: (state, { payload }: PayloadAction<UpdatePayload>) => {
      state.assignments = state.assignments.map((a) => (a._id === payload._id ? payload : a));
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;