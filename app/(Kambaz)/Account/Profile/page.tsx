"use client";

import { useEffect, useState } from "react";
import * as client from "../client";
import { useSession } from "../Session";

export default function ProfilePage() {
  const { currentUser, setCurrentUser, refreshProfile } = useSession();
  const [form, setForm] = useState(currentUser || null);

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    setForm(currentUser);
  }, [currentUser]);

  if (!form) {
    return <div>Loading profile...</div>;
  }

  const updateField = (field: string, value: string) =>
    setForm(prev => (prev ? { ...prev, [field]: value } : prev));

  const save = async () => {
    const updated = await client.updateUser(form._id, form);
    setCurrentUser(updated);
    alert("Profile updated");
  };

  return (
    <div>
      <h1>Profile</h1>

      {Object.entries(form).map(([field, value]) => {
        if (field === "_id") return null;
        return (
          <input
            key={field}
            className="form-control mb-2"
            value={String(value)}
            onChange={e => updateField(field, e.target.value)}
          />
        );
      })}

      <button onClick={save} className="btn btn-success w-100 mt-2">
        Save
      </button>
    </div>
  );
}
