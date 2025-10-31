import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
export default function TodoList(){
  const [todos, setTodos] = useState([{id:"1", title:"Learn React"}, {id:"2", title:"Learn Node"}]);
  const [todo, setTodo] = useState({id:"", title:""});
  const addTodo = (todo:any) => setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
  const deleteTodo = (id:string) => setTodos(todos.filter((t)=> t.id !== id));
  const updateTodo = (todo:any) => setTodos(todos.map((t)=> t.id === todo.id ? todo : t));
  return (<div id="wd-todo-list-redux"><h2>Todo List</h2>
    <ul className="list-group">
      <TodoForm todo={todo} setTodo={setTodo} addTodo={addTodo} updateTodo={updateTodo}/>
      {todos.map((t)=>(<TodoItem key={t.id} todo={t} deleteTodo={deleteTodo} setTodo={setTodo}/>))}
    </ul><hr/></div>);
}