"use client";
export default function TodoItem({ todo, deleteTodo, setTodo }:{ todo:{id:string; title:string}; deleteTodo:(id:string)=>void; setTodo:(t:{id:string; title:string})=>void; }){
  return (<li className="list-group-item">
    <button id="wd-delete-todo-click" onClick={()=> deleteTodo(todo.id)}>Delete</button>
    <button id="wd-set-todo-click" onClick={()=> setTodo(todo)}>Edit</button>
    {todo.title}
  </li>);
}