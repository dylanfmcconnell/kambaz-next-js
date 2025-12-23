import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: string; title: string };

export interface TodosState {
  todos: Todo[];
  todo: Todo;
}

const initialState: TodosState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "", title: "" },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos = [
        ...state.todos,
        { ...payload, id: new Date().getTime().toString() },
      ];
    },
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== payload);
    },
    updateTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos = state.todos.map((t) =>
        t.id === payload.id ? payload : t
      );
    },
    setTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todo = payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;