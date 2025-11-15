"use client";

import { SessionProvider } from "./Account/Session";
import { Provider } from "react-redux";
import store from "./store";

export default function KambazLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <div className="container mt-4">{children}</div>
      </Provider>
    </SessionProvider>
  );
}