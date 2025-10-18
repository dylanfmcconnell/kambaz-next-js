export default function MapFunction() {
  const numberArray1 = [1, 2, 3, 4, 5, 6];
  const square = (a: number) => a * a;
  const todos = ["Buy milk", "Feed the pets"];
  const squares = numberArray1.map(square);
  const cubes = numberArray1.map((a) => a * a * a);
  return (
    <div id="wd-map-function">
      <h4>The Map Function</h4>
      numberArray1 = {numberArray1} <br />
      squares = {squares} <br />
      cubes = {cubes}
      <h4>List of Todos</h4>
      <ol>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ol>
      <hr/>
    </div>
  );
}
