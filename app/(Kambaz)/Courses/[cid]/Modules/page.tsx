"use client";

import ProtectedRoute from "../../../ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "./client";
import type { Module } from "./client";

export default function ModulesWrapper({
  params
}: {
  params: { cid: string };
}) {
  const courseId = params.cid;
  const [modules, setModules] = useState<Module[]>([]);

  const load = async () => {
    const data = await client.fetchModules(courseId);
    setModules(data);
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const createMod = async () => {
    const newMod = await client.createModule(courseId, {
      name: "New Module"
    });
    setModules([...modules, newMod]);
  };

  const renameMod = async (mod: Module, name: string) => {
    const updated = await client.updateModule(mod._id, { name });
    setModules(
      modules.map(m => (m._id === mod._id ? updated : m))
    );
  };

  const deleteMod = async (mod: Module) => {
    await client.deleteModule(mod._id);
    setModules(modules.filter(m => m._id !== mod._id));
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Modules</h1>

        <Link href="/Courses" className="btn btn-secondary mb-3">
          Back to My Courses
        </Link>

        <Link
          href={`/Courses/${courseId}/Assignments`}
          className="btn btn-outline-primary mb-3"
        >
          Assignments
        </Link>

        <button onClick={createMod} className="btn btn-success mb-3">
          Add Module
        </button>

        <ul className="list-group">
          {modules.map(mod => (
            <li
              key={mod._id}
              className="list-group-item d-flex justify-content-between"
            >
              <input
                className="form-control w-50"
                defaultValue={mod.name}
                onBlur={e => renameMod(mod, e.target.value)}
              />

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteMod(mod)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
