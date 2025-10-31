"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

type Person = { name: string; age: number };

export default function ObjectStateVariable() {
  const [person, setPerson] = useState<Person>({ name: "Peter", age: 24 });

  return (
    <div id="wd-object-state-variables">
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <FormControl
        defaultValue={person.name}
        onChange={(e) =>
          setPerson({ ...person, name: (e.target as HTMLInputElement).value })
        }
      />
      <FormControl
        defaultValue={person.age}
        type="number"
        onChange={(e) =>
          setPerson({
            ...person,
            age: parseInt((e.target as HTMLInputElement).value || "0", 10),
          })
        }
      />
      <hr />
    </div>
  );
}