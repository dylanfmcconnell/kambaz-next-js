"use client";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAssignment } from "./reducer";
import type { Assignment } from "../../../Database/types";

type RootAssignments = { assignmentsReducer: { assignments: Assignment[] } };
type AccountState = { accountReducer: { currentUser: { _id: string; role?: "ADMIN"|"FACULTY"|"STUDENT" } | null } };

export default function Assignments() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams() as { cid: string };

  const assignments = useSelector((s: RootAssignments) => s.assignmentsReducer.assignments)
    .filter(a => a.course === cid);

  const currentUser = useSelector((s: AccountState) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center justify-content-between">
        <h2>Assignments</h2>
        {isFaculty && (
          <button className="btn btn-danger"
                  onClick={() => router.push(`/Courses/${cid}/Assignments/Editor`)}
                  id="wd-add-assignment-click">
            + Assignment
          </button>
        )}
      </div>

      <ul className="list-group">
        {assignments.map((a) => (
          <li key={a._id} className="list-group-item d-flex align-items-center">
            <div className="flex-grow-1"
                 role={isFaculty ? "button" : "presentation"}
                 onClick={() => isFaculty && router.push(`/Courses/${cid}/Assignments/Editor?aid=${a._id}`)}>
              <strong>{a.title}</strong>
              <div className="text-secondary small">
                {a.points} pts{a.due ? ` · Due ${a.due}` : ""}
              </div>
            </div>
            {isFaculty && (
              <>
                <button className="btn btn-outline-primary me-2"
                        onClick={() => router.push(`/Courses/${cid}/Assignments/Editor?aid=${a._id}`)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger" onClick={() => setConfirmId(a._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {confirmId && (
        <div className="modal d-block" role="dialog" aria-modal>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Confirm delete</h5></div>
              <div className="modal-body">Are you sure you want to remove this assignment?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setConfirmId(null)}>Cancel</button>
                <button className="btn btn-danger"
                        onClick={() => { dispatch(deleteAssignment(confirmId)); setConfirmId(null); }}>
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}