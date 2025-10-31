import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../../../Database";

export type Module = {
  _id: string;
  name: string;
  course: string;
  lessons: string[];
  editing?: boolean;
};

export interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: (db.modules as unknown as Module[]),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      { payload }: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: Module = {
        _id: Date.now().toString(),
        name: payload.name,
        course: payload.course,
        lessons: [],
      };
      state.modules = [newModule, ...state.modules];
    },
    deleteModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },
    updateModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;