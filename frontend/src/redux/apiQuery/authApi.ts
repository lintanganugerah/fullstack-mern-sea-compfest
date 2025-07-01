import { BASE_QUERY_REAUTH } from "constant/ApiBaseURI";
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
import type {
  csrfTokenRefreshResponse,
  verifyAuthResponse,
} from "modules/auth/types/authTypes";

export const authAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: BASE_QUERY_REAUTH,
  tagTypes: ["Auth", "AuthAdmin"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (credentials) => ({
        url: API_QUERY_PATH.auth.login,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
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
      query: () => ({
        url: API_QUERY_PATH.auth.logout,
        method: "POST",
      }),
      invalidatesTags: ["Auth", "AuthAdmin"],
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
        url: API_QUERY_PATH.auth.register,
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
    verifyAuth: builder.query<verifyAuthResponse, void>({
      query: () => ({
        url: API_QUERY_PATH.auth.verifyAuth,
        method: "POST",
        providesTags: ["Auth"],
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!data.success) {
          throw new Error(data.message);
        }
      },
    }),
    verifyAdmin: builder.query<verifyAuthResponse, void>({
      query: () => ({
        url: API_QUERY_PATH.auth.verifyAdmin,
        method: "POST",
        providedTags: ["AuthAdmin"],
      }),
    }),
    refreshCsrfToken: builder.query<csrfTokenRefreshResponse, void>({
      query: () => ({
        url: API_QUERY_PATH.auth.refreshCsrf,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data.success) {
          throw new Error(data.message);
        }

        dispatch(saveCurrentCsrfToken(data.responseObject.cft));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useLazyVerifyAdminQuery,
  useLazyVerifyAuthQuery,
  useVerifyAdminQuery,
  useVerifyAuthQuery,
  useRefreshCsrfTokenQuery,
  useLazyRefreshCsrfTokenQuery,
} = authAPI;
