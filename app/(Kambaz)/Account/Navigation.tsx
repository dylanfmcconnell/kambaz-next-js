"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "./reducer";

type AccountState = { accountReducer: { currentUser: { username: string } | null } };

export default function AccountNavigation() {
  const currentUser = useSelector(
    (state: AccountState) => state.accountReducer.currentUser
  );
  const dispatch = useDispatch();
  return (
    <div id="wd-account-navigation" className="list-group">
      <Link
        href="/Account/Signin"
        className={`list-group-item ${!currentUser ? "active" : ""}`}
      >
        Signin
      </Link>
      <Link href="/Account/Signup" className="list-group-item">
        Signup
      </Link>
      <Link
        href="/Account/Profile"
        className={`list-group-item ${currentUser ? "active" : ""}`}
      >
        Profile
      </Link>
      <button className="list-group-item" onClick={() => dispatch(signout())}>
        Signout
      </button>
      <Link href="/Labs" className="list-group-item">
        To Labs
      </Link>
    </div>
  );
}