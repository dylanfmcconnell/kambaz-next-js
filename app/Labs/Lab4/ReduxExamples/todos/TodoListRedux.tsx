"use client";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodo } from "./todosReducer";
import type { Todo } from "./todosReducer";
import { FormControl } from "react-bootstrap";

interface TodosSliceState {
  todos: Todo[];
  todo: Todo;
}
interface Lab4State {
  todosReducer: TodosSliceState;
}

export default function TodoListRedux() {
  const todos = useSelector((state: Lab4State) => state.todosReducer.todos);
  const todo = useSelector((state: Lab4State) => state.todosReducer.todo);
  const dispatch = useDispatch();

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List (Redux)</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <button id="wd-add-todo-click" onClick={() => dispatch(addTodo(todo))}>
            Add
          </button>
          <button
            id="wd-update-todo-click"
            onClick={() => dispatch(updateTodo(todo))}
          >
            Update
          </button>
          <FormControl
            value={todo.title}
            onChange={(e) =>
              dispatch(
                setTodo({
                  ...todo,
                  title: (e.target as HTMLInputElement).value,
                })
              )
            }
          />
        </li>
        {todos.map((t) => (
          <li key={t.id} className="list-group-item">
            <button
              id="wd-delete-todo-click"
              onClick={() => dispatch(deleteTodo(t.id))}
            >
              Delete
            </button>
            <button
              id="wd-set-todo-click"
              onClick={() => dispatch(setTodo(t))}
            >
              Edit
            </button>
            {t.title}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}