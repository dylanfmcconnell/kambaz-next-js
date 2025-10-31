"use client";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "../reducer";
import type { Assignment } from "../../../../Database/types";
import { FormControl } from "react-bootstrap";

type RootAssignments = { assignmentsReducer: { assignments: Assignment[] } };
type AccountState = { accountReducer: { currentUser: { _id: string; role?: "ADMIN"|"FACULTY"|"STUDENT" } | null } };

type Draft = {
  title: string;
  description?: string;
  points: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
};

const emptyDraft: Draft = {
  title: "",
  description: "",
  points: 100,
  due: "",
  availableFrom: "",
  availableUntil: "",
};

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const search = useSearchParams();
  const { cid } = useParams() as { cid: string };
  const aid = search.get("aid"); // if you ever switch to [aid], replace with: const { aid } = useParams() as { cid: string; aid?: string };

  const currentUser = useSelector((s: AccountState) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const assignments = useSelector((s: RootAssignments) => s.assignmentsReducer.assignments);
  const existing = aid ? assignments.find(a => a._id === aid) : undefined;

  const [draft, setDraft] = useState<Draft>(emptyDraft);

  useEffect(() => {
    if (aid && existing) {
      setDraft({
        title: existing.title ?? "",
        description: existing.description ?? "",
        points: existing.points ?? 0,
        due: existing.due ?? "",
        availableFrom: existing.availableFrom ?? "",
        availableUntil: existing.availableUntil ?? "",
      });
    } else {
      setDraft(emptyDraft);
    }
  }, [aid, existing]);

  if (!isFaculty) {
    router.replace(`/Courses/${cid}/Assignments`);
    return null;
  }

  const save = () => {
    if (aid && existing) {
      const updated: Assignment = { ...existing, ...draft };
      dispatch(updateAssignment(updated));
    } else {
      const newAssignment: Omit<Assignment, "_id"> = { course: cid, ...draft };
      dispatch(addAssignment(newAssignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const cancel = () => router.push(`/Courses/${cid}/Assignments`);

  return (
    <div id="wd-assignment-editor" style={{ maxWidth: 720 }}>
      <h2>{aid ? "Edit Assignment" : "New Assignment"}</h2>

      <label className="form-label mt-2">Name</label>
      <FormControl
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: (e.target as HTMLInputElement).value })}
      />

      <label className="form-label mt-3">Description</label>
      <FormControl
        as="textarea"
        rows={4}
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: (e.target as HTMLTextAreaElement).value })}
      />

      <label className="form-label mt-3">Points</label>
      <FormControl
        type="number"
        value={draft.points}
        onChange={(e) => setDraft({ ...draft, points: parseInt((e.target as HTMLInputElement).value || "0", 10) })}
      />

      <label className="form-label mt-3">Due date</label>
      <FormControl
        type="date"
        value={draft.due}
        onChange={(e) => setDraft({ ...draft, due: (e.target as HTMLInputElement).value })}
      />

      <label className="form-label mt-3">Available from</label>
      <FormControl
        type="date"
        value={draft.availableFrom}
        onChange={(e) => setDraft({ ...draft, availableFrom: (e.target as HTMLInputElement).value })}
      />

      <label className="form-label mt-3">Available until</label>
      <FormControl
        type="date"
        value={draft.availableUntil}
        onChange={(e) => setDraft({ ...draft, availableUntil: (e.target as HTMLInputElement).value })}
      />

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
        <button className="btn btn-primary" id="wd-save-assignment-click" onClick={save}>Save</button>
      </div>
    </div>
  );
}