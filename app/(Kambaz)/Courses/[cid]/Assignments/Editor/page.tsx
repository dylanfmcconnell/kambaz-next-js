"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import type { Assignment } from "../client";
import { useSession } from "../../../../Account/Session";

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
  const router = useRouter();
  const search = useSearchParams();
  const { cid } = useParams() as { cid: string };
  const aid = search.get("aid");

  const { currentUser } = useSession();
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAssignment = async () => {
      if (aid) {
        try {
          setLoading(true);
          const existing = await client.fetchAssignment(aid);
          setDraft({
            title: existing.title ?? "",
            description: existing.description ?? "",
            points: existing.points ?? 100,
            due: existing.due ?? "",
            availableFrom: existing.availableFrom ?? "",
            availableUntil: existing.availableUntil ?? "",
          });
        } catch (err) {
          console.error("Failed to load assignment", err);
        } finally {
          setLoading(false);
        }
      } else {
        setDraft(emptyDraft);
      }
    };
    loadAssignment();
  }, [aid]);

  useEffect(() => {
    if (currentUser && !isFaculty) {
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, isFaculty, cid, router]);

  if (!isFaculty) {
    return null;
  }

  const save = async () => {
    try {
      if (aid) {
        await client.updateAssignment(aid, draft);
      } else {
        await client.createAssignment(cid, { ...draft, course: cid });
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment", err);
    }
  };

  const cancel = () => router.push(`/Courses/${cid}/Assignments`);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-assignment-editor" style={{ maxWidth: 720 }}>
      <h2>{aid ? "Edit Assignment" : "New Assignment"}</h2>

      <label className="form-label mt-2">Name</label>
      <FormControl
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />

      <label className="form-label mt-3">Description</label>
      <FormControl
        as="textarea"
        rows={4}
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      />

      <label className="form-label mt-3">Points</label>
      <FormControl
        type="number"
        value={draft.points}
        onChange={(e) => setDraft({ ...draft, points: parseInt(e.target.value || "0", 10) })}
      />

      <label className="form-label mt-3">Due date</label>
      <FormControl
        type="date"
        value={draft.due}
        onChange={(e) => setDraft({ ...draft, due: e.target.value })}
      />

      <label className="form-label mt-3">Available from</label>
      <FormControl
        type="date"
        value={draft.availableFrom}
        onChange={(e) => setDraft({ ...draft, availableFrom: e.target.value })}
      />

      <label className="form-label mt-3">Available until</label>
      <FormControl
        type="date"
        value={draft.availableUntil}
        onChange={(e) => setDraft({ ...draft, availableUntil: e.target.value })}
      />

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
        <button className="btn btn-primary" id="wd-save-assignment-click" onClick={save}>Save</button>
      </div>
    </div>
  );
}
