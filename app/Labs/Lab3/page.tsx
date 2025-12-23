// app/Labs/Lab3/page.tsx
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";

import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";

import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";

import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import Spreading from "./Spreader";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";

import Classes from "./Classes";
import Styles from "./Styles";

import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";

import PathParameters from "./PathParameters";

import TodoList from "./todos/TodoList";

export default function Lab3() {
  console.log('Hello World!');
  return(
    <div id="wd-lab3" className="container">
      <h3>Lab 3</h3>

      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>

      <IfElse/>
      <TernaryOperator/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>

      <ArrowFunctions/>
      <ImpliedReturn/>
      <TemplateLiterals/>

      <ArrayIndexAndLength/>
      <AddingAndRemovingToFromArrays/>
      <ForLoops/>
      <MapFunction/>
      <FindFunction/>
      <FindIndex/>
      <FilterFunction/>
      <JsonStringify/>
      <House/>
      <Spreading/>
      <Destructing/>
      <FunctionDestructing/>
      <DestructingImports/>

      <Classes/>
      <Styles/>

      <Add a={3} b={4}/>
      <div>
        <h4>Square</h4>
        <Square>4</Square>
      </div>
      <div>
        <h4>Highlight</h4>
        <Highlight>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe.
        </Highlight>
      </div>

      <PathParameters/>

      <TodoList/>
    </div>
  );
}
