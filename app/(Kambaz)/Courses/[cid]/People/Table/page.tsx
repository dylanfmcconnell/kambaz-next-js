"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span> <span className="wd-last-name">Stark</span>
            </td>
            <td>001234561S</td><td>S101</td><td>STUDENT</td><td>2020-10-01T00:00:00.000Z</td><td>10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span> <span className="wd-last-name">Wayne</span>
            </td>
            <td>001234562B</td><td>S101</td><td>STUDENT</td><td>2020-11-02T00:00:00.000Z</td><td>15:32:43</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span> <span className="wd-last-name">Rogers</span>
            </td>
            <td>001234563S</td><td>S101</td><td>STUDENT</td><td>2020-10-02T00:00:00.000Z</td><td>23:23:42</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span> <span className="wd-last-name">Romanoff</span>
            </td>
            <td>001234564N</td><td>S101</td><td>TA</td><td>2020-11-05T00:00:00.000Z</td><td>13:23:34</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Thor</span> <span className="wd-last-name">Odinson</span>
            </td>
            <td>001234565S</td><td>S101</td><td>STUDENT</td><td>2020-12-01T00:00:00.000Z</td><td>11:22:33</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span> <span className="wd-last-name">Banner</span>
            </td>
            <td>001234566S</td><td>S101</td><td>STUDENT</td><td>2020-12-01T00:00:00.000Z</td><td>22:33:44</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
