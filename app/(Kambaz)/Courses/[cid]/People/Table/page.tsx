"use client";
import Table from "react-bootstrap/Table";
import { useParams } from "next/navigation";
import { users, enrollments } from "../../../../Database";
import type { User, Enrollment } from "../../../../Database/types";

export default function PeopleTablePage() {
  const { cid } = useParams<{ cid: string }>();
  const rows = users.filter((usr: User) =>
    enrollments.some((en: Enrollment) => en.user === usr._id && en.course === cid)
  );

  return (
    <div id="wd-people">
      <h3>People</h3>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span className="wd-first-name me-2 fs-1 text-secondary">{user.firstName}</span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
