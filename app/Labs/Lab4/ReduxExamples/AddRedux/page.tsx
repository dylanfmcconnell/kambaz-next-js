"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";

interface Lab4State {
  addReducer: { sum: number };
}

export default function AddRedux() {
  const [a, setA] = useState<number>(12);
  const [b, setB] = useState<number>(23);
  const sum = useSelector((state: Lab4State) => state.addReducer.sum);
  const dispatch = useDispatch();
  return (
    <div id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(parseInt((e.target as HTMLInputElement).value || "0", 10))}
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(parseInt((e.target as HTMLInputElement).value || "0", 10))}
      />
      <button id="wd-add-redux-click" onClick={() => dispatch(add({ a, b }))}>
        Add
      </button>
      <hr />
    </div>
  );
}