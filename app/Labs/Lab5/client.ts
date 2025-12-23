import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";


export interface Assignment {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};


const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = async (): Promise<Assignment> => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data as Assignment;
};

export const updateTitle = async (title: string): Promise<Assignment> => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data as Assignment;
};


const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(TODOS_API);
  return response.data as Todo[];
};

export const createNewTodo = async (): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data as Todo[];
};

export const postNewTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await axios.post(`${TODOS_API}/create`, todo);
  return response.data as Todo;
};

export const removeTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data as Todo[];
};

export const deleteTodo = async (todo: Todo): Promise<void> => {
  await axios.delete(`${TODOS_API}/${todo.id}`);
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  await axios.put(`${TODOS_API}/${todo.id}`, todo);
};