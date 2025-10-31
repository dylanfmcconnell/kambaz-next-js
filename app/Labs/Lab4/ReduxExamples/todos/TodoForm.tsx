"use client";
import { FormControl } from "react-bootstrap";
import type { Todo } from "./todosReducer";

type Props = {
  todo: Todo;
  setTodo: (t: Todo) => void;
  addTodo: (t: Todo) => void;
  updateTodo: (t: Todo) => void;
};

export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: Props) {
  return (
    <li className="list-group-item">
      <button id="wd-add-todo-click" onClick={() => addTodo(todo)}>
        Add
      </button>
      <button id="wd-update-todo-click" onClick={() => updateTodo(todo)}>
        Update
      </button>
      <FormControl
        value={todo.title}
        onChange={(e) =>
          setTodo({ ...todo, title: (e.target as HTMLInputElement).value })
        }
      />
    </li>
  );
}