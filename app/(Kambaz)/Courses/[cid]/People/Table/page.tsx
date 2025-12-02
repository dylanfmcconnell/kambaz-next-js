"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./index";
import * as coursesClient from "../../../client";

export default function PeopleTablePage() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const usersData = await coursesClient.findUsersForCourse(cid);
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
