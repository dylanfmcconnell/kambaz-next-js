export default function VariableTypes() {
  const numberVariable = 123;
  const floatingPointNumber = 234.345;
  const stringVariable = "hello";
  const booleanVariable = true;
  const isNumber = typeof numberVariable === "number";
  const isString = typeof stringVariable === "string";
  const isBoolean = typeof booleanVariable === "boolean";
  return (
    <div id="wd-variable-types">
      <h4>Variable Types</h4>
      numberVariable = {numberVariable} <br />
      floatingPointNumber = {floatingPointNumber} <br />
      stringVariable = {stringVariable} <br />
      booleanVariable = {booleanVariable + ""} <br />
      isNumber = {isNumber + ""} <br />
      isString = {isString + ""} <br />
      isBoolean = {isBoolean + ""} <hr />
    </div>
  );
}
