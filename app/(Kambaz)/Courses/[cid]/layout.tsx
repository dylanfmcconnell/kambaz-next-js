import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type Props = { children: ReactNode; params: { cid: string } };

export default function CoursesLayout({ children, params }: Props) {
  const { cid } = params;
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200"> <CourseNavigation /> </td>
            <td valign="top" width="100%"> {children} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}