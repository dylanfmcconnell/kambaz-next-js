"use client";
import { useSelector } from "react-redux";

interface Lab4State {
  helloReducer: { message: string };
}

export default function HelloRedux() {
  const message = useSelector((state: Lab4State) => state.helloReducer.message);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}