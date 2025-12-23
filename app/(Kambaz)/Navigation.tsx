"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";

const links = [
  { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
  { label: "Courses",   path: "/Courses",   icon: LiaBookSolid },
  { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline },
  { label: "Inbox",     path: "/Inbox",     icon: FaInbox },
  { label: "Labs",      path: "/Labs",      icon: LiaCogSolid },
];

export default function KambazNavigation() {
  const pathname = usePathname();
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }}
               className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroupItem className="bg-danger border-0 text-center">
        <a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">
          <img src="/images/NEU.png" width={75} />
        </a>
      </ListGroupItem>
      <ListGroupItem
        className={`bg-white text-danger ${pathname.includes("Account") ? "bg-black text-white" : ""}`}
      >
        <Link href="/Account" className={`text-danger ${pathname.includes("Account") ? "text-white" : ""}`}>
          Account
        </Link>
      </ListGroupItem>
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname.startsWith(link.path);
        return (
          <ListGroupItem key={link.path} as={Link} href={link.path}
                         className={`bg-black text-center border-0 ${active ? "text-danger bg-white" : "text-white bg-black"}`}>
            <Icon className="me-2 fs-3" />
            <div className={active ? "fs-5 text-danger" : "fs-5 text-white"}>{link.label}</div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
