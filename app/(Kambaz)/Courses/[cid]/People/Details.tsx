"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import type { User } from "../../../Account/client";

interface PeopleDetailsProps {
  uid: string | null;
  onClose: () => void;
}

export default function PeopleDetails({ uid, onClose }: PeopleDetailsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const userData = await client.findUserById(uid);
    setUser(userData);
    setName(`${userData.firstName} ${userData.lastName}`);
    setEmail(userData.email ?? "");
    setRole(userData.role ?? "");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid || !user) return null;

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    if (!user) return;
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser._id, updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil 
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" 
          />
        )}
        {editing && (
          <FaCheck 
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" 
          />
        )}
        {!editing && (
          <div 
            className="wd-name"
            onClick={() => setEditing(true)}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <input
            className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Roles:</b>{" "}
      {!editing && <span className="wd-roles">{user.role}</span>}
      {editing && (
        <select 
          className="form-select w-50 wd-select-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      )}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span>
      <br />
      <b>Email:</b>{" "}
      {!editing && <span className="wd-email">{user.email}</span>}
      {editing && (
        <input
          type="email"
          className="form-control w-50 wd-edit-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button 
        onClick={() => deleteUser(uid)} 
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button 
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
