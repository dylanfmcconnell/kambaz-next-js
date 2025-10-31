"use client";
import { FormControl } from "react-bootstrap";
export default function TodoForm({todo, setTodo, addTodo, updateTodo}:{todo:{id:string; title:string}; setTodo:(t:any)=>void; addTodo:(t:any)=>void; updateTodo:(t:any)=>void;}){
  return (<li className="list-group-item">
    <button id="wd-add-todo-click" onClick={()=> addTodo(todo)}>Add</button>
    <button id="wd-update-todo-click" onClick={()=> updateTodo(todo)}>Update</button>
    <FormControl value={todo.title} onChange={(e)=> setTodo({ ...todo, title:(e.target as HTMLInputElement).value })} />
  </li>);
}