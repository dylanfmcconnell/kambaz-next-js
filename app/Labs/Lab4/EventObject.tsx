"use client";
import { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cloned: Record<string, unknown> = {};
    for (const key in e) {
      const value = (e as unknown as Record<string, unknown>)[key];
      if (
        typeof value !== "function" &&
        typeof value !== "object" &&
        value !== undefined
      ) {
        cloned[key] = value;
      }
    }
    cloned.target = (e.target as HTMLElement).outerHTML;

    setEvent(cloned);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}