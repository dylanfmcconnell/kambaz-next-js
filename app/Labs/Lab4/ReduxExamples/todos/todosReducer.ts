import { createSlice } from "@reduxjs/toolkit";
const initialState = { todos: [{id:"1", title:"Learn React"},{id:"2", title:"Learn Node"}], todo:{id:"", title:""} };
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, {payload}) => { state.todos = [...state.todos, { ...payload, id: new Date().getTime().toString() }]; },
    deleteTodo: (state, {payload}) => { state.todos = state.todos.filter((t:any)=> t.id !== payload); },
    updateTodo: (state, {payload}) => { state.todos = state.todos.map((t:any)=> t.id === payload.id ? payload : t); },
    setTodo: (state, {payload}) => { state.todo = payload; },
  }
});
export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;