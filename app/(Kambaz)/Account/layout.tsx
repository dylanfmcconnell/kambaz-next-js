import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-account" className="d-flex">
      <div className="flex-fill me-3">{children}</div>
      <div className="d-none d-lg-block" style={{ width: 220 }}>
        <AccountNavigation />
      </div>
    </div>
  );
}
