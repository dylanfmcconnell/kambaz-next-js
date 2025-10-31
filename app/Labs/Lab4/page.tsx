"use client";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples/page";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import AddRedux from "./ReduxExamples/AddRedux/page";
import TodoList from "./ReduxExamples/todos/TodoList";
import TodoListRedux from "./ReduxExamples/todos/TodoListRedux";
import { Provider } from "react-redux";
import store from "./store";

export default function Lab4(){
  function sayHello(){ alert("Hello!"); }
  return (<Provider store={store}><div id="wd-passing-functions"><h2>Lab 4</h2>
    <PassingFunctions theFunction={sayHello} />
    <HelloRedux/>
    <CounterRedux/>
    <AddRedux/>
    <TodoList/>
    <TodoListRedux/>
  </div></Provider>);
}