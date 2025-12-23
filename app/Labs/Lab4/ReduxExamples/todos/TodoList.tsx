"use client";
import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import type { Todo } from "./todosReducer";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "", title: "" });

  const addTodo = (t: Todo) =>
    setTodos([...todos, { ...t, id: new Date().getTime().toString() }]);
  const deleteTodo = (id: string) =>
    setTodos(todos.filter((x) => x.id !== id));
  const updateTodo = (t: Todo) =>
    setTodos(todos.map((x) => (x.id === t.id ? t : x)));

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}
        />
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            setTodo={setTodo}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}