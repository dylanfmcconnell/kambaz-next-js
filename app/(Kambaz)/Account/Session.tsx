"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as client from "./client";
import type { User } from "./client";

interface SessionContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  refreshProfile: () => Promise<void>;
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

  const refreshProfile = async () => {
    try {
      const profile = await client.profile();
      setCurrentUser(profile);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <SessionContext.Provider
      value={{ currentUser, setCurrentUser, refreshProfile }}
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
