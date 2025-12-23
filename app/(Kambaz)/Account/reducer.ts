import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
  dob?: string;
}

type AccountState = {
  currentUser: User | null;
};

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User | null>) => {
      state.currentUser = payload;
    },
    signout: (state) => {
      state.currentUser = null;
    },
    updateCurrentUser: (state, { payload }: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...payload };
      }
    },
  },
});

export const { setCurrentUser, signout, updateCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
