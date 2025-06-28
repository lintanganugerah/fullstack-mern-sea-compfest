import { BASE_QUERY_REDUX } from "constant/ApiBaseURI";
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  JwtPayload,
  LoginFormData,
  LoginResponse,
} from "modules/auth/types/loginTypes";
import {
  saveCurrentJwtToken,
  saveCurrentCsrfToken,
} from "redux/slice/authSlice";
import { saveUserState } from "redux/slice/userSlice";
import { jwtDecode } from "jwt-decode";
import { API_QUERY_PATH } from "constant/ApiQueryPath";

export const authAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: BASE_QUERY_REDUX,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (credentials) => ({
        url: API_QUERY_PATH.login,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data);

          const decoded = jwtDecode<JwtPayload>(data.responseObject.token);
          const userId = decoded.id;
          const fullName = decoded.fullName;
          const roleAlias = decoded.rl;

          dispatch(
            saveUserState({
              _id: userId,
              fullName,
              rl: roleAlias,
            })
          );
          dispatch(saveCurrentJwtToken(data.responseObject.token));
          dispatch(saveCurrentCsrfToken(data.responseObject.cft));
        } catch (error) {
          console.error("Token Failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
