"use client";

import { SessionProvider } from "./Account/Session";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";

export default function KambazLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <KambazNavigation />
        <div className="container mt-4" style={{ marginLeft: 120 }}>
          {children}
        </div>
      </Provider>
    </SessionProvider>
  );
}
