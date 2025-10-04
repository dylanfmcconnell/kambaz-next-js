"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item className="bg-black border-0 text-center" as="a" target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75" alt="" />
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Account") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Account" id="wd-account-link" className={`${isActive("/Account") ? "text-danger" : "text-white"} text-decoration-none`}>
          <FaRegCircleUser className={`fs-1 ${isActive("/Account") ? "text-danger" : "text-white"}`} />
          <br />
          Account
        </Link>
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Dashboard") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Dashboard" id="wd-dashboard-link" className={`${isActive("/Dashboard") ? "text-danger" : "text-white"} text-decoration-none`}>
          <AiOutlineDashboard className={`fs-1 ${isActive("/Dashboard") ? "text-danger" : "text-white"}`} />
          <br />
          Dashboard
        </Link>
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Courses") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Courses/1234/Home" id="wd-courses-link" className={`${isActive("/Courses") ? "text-danger" : "text-white"} text-decoration-none`}>
          <LiaBookSolid className={`fs-1 ${isActive("/Courses") ? "text-danger" : "text-white"}`} />
          <br />
          Courses
        </Link>
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Calendar") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Calendar" id="wd-calendar-link" className={`${isActive("/Calendar") ? "text-danger" : "text-white"} text-decoration-none`}>
          <IoCalendarOutline className={`fs-1 ${isActive("/Calendar") ? "text-danger" : "text-white"}`} />
          <br />
          Calendar
        </Link>
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Inbox") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Inbox" id="wd-inbox-link" className={`${isActive("/Inbox") ? "text-danger" : "text-white"} text-decoration-none`}>
          <FaInbox className={`fs-1 ${isActive("/Inbox") ? "text-danger" : "text-white"}`} />
          <br />
          Inbox
        </Link>
      </ListGroup.Item>
      <br />
      <ListGroup.Item className={`border-0 text-center ${isActive("/Settings") ? "bg-white active-link" : "bg-black"}`}>
        <Link href="/Settings" id="wd-settings-link" className={`${isActive("/Settings") ? "text-danger" : "text-white"} text-decoration-none`}>
          <LiaCogSolid className={`fs-1 ${isActive("/Settings") ? "text-danger" : "text-white"}`} />
          <br />
          Settings
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
}
