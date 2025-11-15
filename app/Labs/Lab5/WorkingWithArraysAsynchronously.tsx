"use client";

import React, { useEffect, useState } from "react";
import { ListGroup, FormCheck, FormControl } from "react-bootstrap";
import axios from "axios";
import { FaTrash,  FaCircle, FaPencil } from "react-icons/fa6";
import * as client from "./client";
import type { Todo } from "./client";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message;
    return message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTodos = async () => {
    const data = await client.fetchTodos();
    setTodos(data);
    setErrorMessage(null);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleRemoveTodo = async (todo: Todo) => {
    const updated = await client.removeTodo(todo);
    setTodos(updated);
  };

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error, "Delete failed"));
    }
  };

  const handleCreateNewTodo = async () => {
    const updated = await client.createNewTodo();
    setTodos(updated);
  };

  const handlePostNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false
    });
    setTodos([...todos, newTodo]);
  };

  const handleToggleCompleted = async (todo: Todo) => {
    const updatedTodo: Todo = { ...todo, completed: !todo.completed };
    try {
      await client.updateTodo(updatedTodo);
      setTodos(
        todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
      setErrorMessage(null);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error, "Update failed"));
    }
  };

  const handleEditTitle = (todo: Todo) => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, editing: !t.editing } : t
      )
    );
  };

  const handleTitleChange =
    (todo: Todo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTodos(
        todos.map((t) =>
          t.id === todo.id ? { ...t, title: value } : t
        )
      );
    };

  const handleTitleKeyDown =
    (todo: Todo) => async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        try {
          await client.updateTodo(todo);
          setTodos(
            todos.map((t) =>
              t.id === todo.id ? { ...t, editing: false } : t
            )
          );
          setErrorMessage(null);
        } catch (error: unknown) {
          setErrorMessage(getErrorMessage(error, "Update failed"));
        }
      }
    };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos{" "}
        <FaCircle
          id="wd-create-todo"
          className="text-success float-end fs-3"
          onClick={handleCreateNewTodo}
        />
        <FaCircle
          id="wd-post-todo"
          className="text-primary float-end fs-3 me-3"
          onClick={handlePostNewTodo}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaPencil
              className="text-primary float-end me-2 mt-1"
              onClick={() => handleEditTitle(todo)}
            />
            <FaPencil
              id="wd-delete-todo"
              className="text-danger float-end me-2 mt-1"
              onClick={() => handleDeleteTodo(todo)}
            />
            <FaTrash
              id="wd-remove-todo"
              className="text-danger float-end mt-1"
              onClick={() => handleRemoveTodo(todo)}
            />
            <FormCheck
              className="form-check-input me-2"
              defaultChecked={todo.completed}
              onChange={() => handleToggleCompleted(todo)}
            />
            {todo.editing ? (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onChange={handleTitleChange(todo)}
                onKeyDown={handleTitleKeyDown(todo)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none"
                }}
              >
                {todo.title}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}