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
  removeCurrentCsrfToken,
  removeCurrentJwtToken,
} from "redux/slice/authSlice";
import { removeUserState, saveUserState } from "redux/slice/userSlice";
import { jwtDecode } from "jwt-decode";
import { API_QUERY_PATH } from "constant/ApiQueryPath";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";
import type {
  RegisterFormData,
  RegisterResponse,
} from "modules/auth/types/registerTypes";

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
        const { data } = await queryFulfilled;

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
      },
    }),
    logout: builder.mutation<BaseApiResponseTypes, void>({
      query: (credentials) => {
        const token = localStorage.getItem("persist:root")
          ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth)
              .token
          : null;
        return {
          url: API_QUERY_PATH.logout,
          method: "POST",
          body: credentials,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data.success) {
          throw new Error(data.message);
        }

        dispatch(removeCurrentCsrfToken());
        dispatch(removeCurrentJwtToken());
        dispatch(removeUserState());
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (userData) => ({
        url: API_QUERY_PATH.register,
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!data.success) {
          throw new Error(data.message);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authAPI;
