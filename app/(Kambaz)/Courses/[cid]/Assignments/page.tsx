import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <div>Multiple Modules | <b>Not available until</b> Jan 1st at 12:00am | <b>Due</b> Dec 31st at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>Multiple Modules | <b>Not available until</b> Jan 1st at 12:00am | <b>Due</b> Dec 31st at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>Multiple Modules | <b>Not available until</b> Jan 1st at 12:00am | <b>Due</b> Dec 31 at 11:59pm | 100 pts</div>
        </li>
      </ul>
    </div>
  );