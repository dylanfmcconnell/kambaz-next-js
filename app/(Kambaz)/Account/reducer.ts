import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../Database";
import type { User as DbUser } from "../Database/types";

// Local credential-friendly view: username/password may or may not exist on your DbUser
type CredentialUser = { _id: string } & Partial<{
  username: string;
  password: string;
  role: "ADMIN" | "FACULTY" | "STUDENT";
}>;

type AccountState = {
  users: CredentialUser[];
  currentUser: CredentialUser | null;
};

const initialState: AccountState = {
  users: (db.users as unknown as CredentialUser[]),
  currentUser: null,
};

type SigninPayload = { username: string; password: string };
type UpdatePayload = { _id: string } & Record<string, unknown>;

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signin: (state, { payload }: PayloadAction<SigninPayload>) => {
      const found = state.users.find(
        (u) => u.username === payload.username && u.password === payload.password
      );
      state.currentUser = found ?? null;
    },
    signout: (state) => {
      state.currentUser = null;
    },
    // Accept a partial update (don’t force exact DbUser shape).
    updateCurrentUser: (state, { payload }: PayloadAction<UpdatePayload>) => {
      state.currentUser = { ...(state.currentUser ?? {}), ...payload };
      state.users = state.users.map((u) =>
        u._id === payload._id ? ({ ...u, ...payload }) : u
      );
    },
  },
});

export const { signin, signout, updateCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
