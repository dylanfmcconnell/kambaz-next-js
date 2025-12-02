"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSession } from "./Session";
import * as client from "./client";

export default function AccountNavigation() {
  const { currentUser, setCurrentUser } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignout = async () => {
    await client.signout();
    setCurrentUser(null);
    router.push("/Account/Signin");
  };

  return (
    <Nav variant="pills" className="flex-column">
      {!currentUser && (
        <>
          <NavItem>
            <NavLink 
              as={Link} 
              href="/Account/Signin"
              active={pathname.endsWith("Signin")}
            >
              Signin
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              as={Link} 
              href="/Account/Signup"
              active={pathname.endsWith("Signup")}
            >
              Signup
            </NavLink>
          </NavItem>
        </>
      )}
      {currentUser && (
        <>
          <NavItem>
            <NavLink 
              as={Link} 
              href="/Account/Profile"
              active={pathname.endsWith("Profile")}
            >
              Profile
            </NavLink>
          </NavItem>
          {currentUser.role === "ADMIN" && (
            <NavItem>
              <NavLink 
                as={Link} 
                href="/Account/Users"
                active={pathname.endsWith("Users")}
              >
                Users
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink 
              as="button" 
              onClick={handleSignout}
              className="text-start"
            >
              Signout
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
}
