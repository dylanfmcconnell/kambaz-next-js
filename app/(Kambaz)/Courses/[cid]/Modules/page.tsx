"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import * as client from "./client";
import type { Module } from "./client";
import { useSession } from "../../../Account/Session";

export default function Modules() {
  const params = useParams();
  const cid = (params?.cid ?? "") as string;
  const { currentUser } = useSession();
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [modules, setModules] = useState<Module[]>([]);
  const [moduleName, setModuleName] = useState("");

  const loadModules = useCallback(async () => {
    try {
      const data = await client.fetchModules(cid);
      setModules(data);
    } catch (err) {
      console.error("Failed to load modules", err);
      setModules([]);
    }
  }, [cid]);

  useEffect(() => {
    if (cid) loadModules();
  }, [cid, loadModules]);

  const add = async () => {
    try {
      const newMod = await client.createModule(cid, { name: moduleName });
      setModules([...modules, newMod]);
      setModuleName("");
    } catch (err) {
      console.error("Failed to add module", err);
    }
  };

  const del = async (moduleId: string) => {
    try {
      await client.deleteModule(cid, moduleId);
      setModules(modules.filter((m) => m._id !== moduleId));
    } catch (err) {
      console.error("Failed to delete module", err);
    }
  };

  const edit = (moduleId: string) => {
    setModules(
      modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      )
    );
  };

  const saveEdit = async (mod: Module & { editing?: boolean }) => {
    try {
      await client.updateModule(cid, mod._id, { name: mod.name });
      setModules(
        modules.map((m) =>
          m._id === mod._id ? { ...m, editing: false } : m
        )
      );
    } catch (err) {
      console.error("Failed to save module", err);
    }
  };

  return (
    <div className="wd-modules">
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={add}
        />
      )}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: Module & { editing?: boolean }) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    setModules(
                      modules.map((m) =>
                        m._id === module._id ? { ...m, name: e.target.value } : m
                      )
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(module);
                    }
                  }}
                  onBlur={() => saveEdit(module)}
                />
              )}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={del}
                  editModule={edit}
                />
              )}
            </div>
            {module.lessons && module.lessons.length > 0 && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson, idx) => (
                  <li key={lesson._id || idx} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
