"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
export default function AddRedux(){
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const sum = useSelector((state:any)=> state.addReducer.sum);
  const dispatch = useDispatch();
  return (<div id="wd-add-redux">
    <h1>Add Redux</h1>
    <h2>{a} + {b} = {sum}</h2>
    <input type="number" value={a} onChange={(e)=> setA(parseInt((e.target as HTMLInputElement).value))} />
    <input type="number" value={b} onChange={(e)=> setB(parseInt((e.target as HTMLInputElement).value))} />
    <button id="wd-add-redux-click" onClick={()=> dispatch(add({a,b}))}>Add</button>
    <hr/></div>);
}