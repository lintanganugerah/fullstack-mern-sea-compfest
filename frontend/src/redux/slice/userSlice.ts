import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "modules/auth/types/loginTypes";

const initialState = {
  _id: "",
  fullName: "",
  rl: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserState: (state: UserState, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.rl = action.payload.rl;
    },
    removeUserState: (state: UserState) => {
      state._id = "";
      state.fullName = "";
      state.rl = "";
    },
  },
});

export const { saveUserState, removeUserState } = userSlice.actions;
export default userSlice.reducer;
