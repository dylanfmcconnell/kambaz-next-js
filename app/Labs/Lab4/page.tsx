"use client";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";

import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

import HelloRedux from "./ReduxExamples/HelloRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import AddRedux from "./ReduxExamples/AddRedux/page";
import TodoList from "./ReduxExamples/todos/TodoList";
import TodoListRedux from "./ReduxExamples/todos/TodoListRedux";

import { Provider } from "react-redux";
import store from "./store";

export default function Lab4() {
  const sayHello = () => alert("Hello!");

  return (
    <Provider store={store}>
      <div id="wd-lab4">
        <h2>Lab 4</h2>

        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
        <TodoListRedux />
      </div>
    </Provider>
  );
}