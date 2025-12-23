"use client";

import { ReactNode } from "react";
import { SessionProvider } from "./Account/Session";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <div id="wd-kambaz">
          <div className="d-flex">
            <div>
              <KambazNavigation />
            </div>
            <div className="wd-main-content-offset p-3 flex-fill">{children}</div>
          </div>
        </div>
      </Provider>
    </SessionProvider>
  );
}