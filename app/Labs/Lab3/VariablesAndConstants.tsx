export default function VariablesAndConstants() {
  const functionScoped = 123;
  const blockScoped = 234;
  const constant1 = 345;
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped} <br />
      blockScoped = {blockScoped} <br />
      constant1 = {constant1} <hr />
    </div>
  );
}
