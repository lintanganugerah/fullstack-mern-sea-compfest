import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type CsrfTokenState,
  type JwtTokenState,
} from "modules/auth/types/loginTypes";
import { aliasName } from "utils/aliasName";

const initialState = {
  token: "",
  [aliasName["csrf_token"]]: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveCurrentJwtToken: (
      state: JwtTokenState,
      action: PayloadAction<string>
    ) => {
      const token = action.payload;
      state.token = token;
    },
    removeCurrentJwtToken: (state: JwtTokenState) => {
      state.token = "";
    },
    saveCurrentCsrfToken: (
      state: CsrfTokenState,
      action: PayloadAction<string>
    ) => {
      const token = action.payload;
      state[aliasName.csrf_token] = token;
    },

    removeCurrentCsrfToken: (state: CsrfTokenState) => {
      state[aliasName.csrf_token] = "";
    },
  },
});

export const {
  saveCurrentJwtToken,
  removeCurrentJwtToken,
  saveCurrentCsrfToken,
  removeCurrentCsrfToken,
} = authSlice.actions;
export default authSlice.reducer;
