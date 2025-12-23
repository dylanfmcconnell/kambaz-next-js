"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as client from "./client";
import type { User } from "./client";

interface SessionContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  refreshProfile: () => Promise<void>;
  initializing: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const refreshProfile = async () => {
    try {
      const profile = await client.profile();
      setCurrentUser(profile);
    } catch {
      setCurrentUser(null);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    // initial load
    void refreshProfile();
  }, []);

  return (
    <SessionContext.Provider
      value={{ currentUser, setCurrentUser, refreshProfile, initializing }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
};
