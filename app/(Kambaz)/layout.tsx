"use client";

import { SessionProvider } from "./Account/Session";

export default function KambazLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="container mt-4">{children}</div>
    </SessionProvider>
  );
}
