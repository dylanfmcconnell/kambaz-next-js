"use client";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";

type Module = {
  _id: string;
  name: string;
  course: string;
  lessons: string[];
  editing?: boolean;
};
type ModulesState = { modulesReducer: { modules: Module[] } };

export default function Modules() {
  const dispatch = useDispatch();
  const params = useParams();
  const cid = (params?.cid ?? "") as string;
  const [moduleName, setModuleName] = useState("");

  const modules = useSelector(
    (state: ModulesState) => state.modulesReducer.modules
  );

  const add = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };
  const del = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };
  const update = (m: Module) => {
    dispatch(updateModule(m));
  };
  const edit = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={add}
      />
      <ul className="list-group rounded-0">
        {modules
          .filter((m) => m.course === cid)
          .map((module) => (
            <li key={module._id} className="list-group-item">
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) =>
                    update({
                      ...module,
                      name: (e.target as HTMLInputElement).value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      update({ ...module, editing: false });
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={del}
                editModule={edit}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}