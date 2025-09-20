// app/(Kambaz)/Dashboard/page.tsx
import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0001" className="wd-dashboard-course-link">
            <Image src="/images/walk.jpg" width={200} height={150} alt="Walking" />
            <div>
              <h5> LF0001 Walking </h5>
              <p className="wd-dashboard-course-title">
                Walker
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0002" className="wd-dashboard-course-link">
            <Image src="/images/run.jpg" width={200} height={150} alt="Running" />
            <div>
              <h5> LF0002 Running </h5>
              <p className="wd-dashboard-course-title">
                Runner
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0003" className="wd-dashboard-course-link">
            <Image src="/images/sprint.jpg" width={200} height={150} alt="Sprinting" />
            <div>
              <h5> LF0003 Sprinting </h5>
              <p className="wd-dashboard-course-title">
                Sprinter
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0004" className="wd-dashboard-course-link">
            <Image src="/images/jump.jpg" width={200} height={150} alt="Jumping" />
            <div>
              <h5> LF0004 Jumping </h5>
              <p className="wd-dashboard-course-title">
                Jumper
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0005" className="wd-dashboard-course-link">
            <Image src="/images/float.jpg" width={200} height={150} alt="Floating" />
            <div>
              <h5> LF0005 Floating </h5>
              <p className="wd-dashboard-course-title">
                Floater
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/0006" className="wd-dashboard-course-link">
            <Image src="/images/fly.jpg" width={200} height={150} alt="Flying" />
            <div>
              <h5> LF0006 Flying </h5>
              <p className="wd-dashboard-course-title">
                Flyer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
