import {
  fetchBaseQuery,
  type FetchArgs,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { API_QUERY_PATH } from "./ApiQueryPath";
import { saveCurrentCsrfToken } from "redux/slice/authSlice";
import type { csrfTokenRefreshResponse } from "modules/auth/types/authTypes";
import { aliasName } from "utils/aliasName";
import type { RootState } from "redux/redux.store";

export const BASE_URI = `${import.meta.env.VITE_REST_ENDPOINT}/api/${
  import.meta.env.VITE_ENDPOINT_VERSION
}`;

export const BASE_QUERY_REDUX = retry(
  fetchBaseQuery({
    baseUrl: BASE_URI,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      const csrfToken = state.auth[aliasName["csrf_token"]];

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (csrfToken) {
        headers.set("X-CSRF-TOKEN", csrfToken);
      }
      return headers;
    },
  }),
  {
    maxRetries: 2,
  }
);

const mutex = new Mutex();

export const BASE_QUERY_REAUTH: typeof BASE_QUERY_REDUX = async (
  args: string | FetchArgs,
  api,
  extraOptions
) => {
  // Tunggu hingga Mutex tidak terkunci sebelum melanjutkan
  await mutex.waitForUnlock();
  let result = await BASE_QUERY_REDUX(args, api, extraOptions);

  // Cek apakah permintaan gagal karena error CSRF (403)
  const isInvalidCsrf =
    result.error &&
    result.error.status === 403 &&
    JSON.stringify(result.error.data).toLowerCase().includes("csrf");

  if (isInvalidCsrf) {
    // Kunci mutex untuk mencegah permintaan lain mencoba refresh token
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Panggil endpoint refresh token
        const refreshResult = await BASE_QUERY_REDUX(
          { url: API_QUERY_PATH.auth.refreshCsrf, method: "GET" },
          api,
          extraOptions
        );

        const dataResponse = refreshResult.data as csrfTokenRefreshResponse;

        if (dataResponse) {
          // Simpan token CSRF baru ke state
          api.dispatch(saveCurrentCsrfToken(dataResponse.responseObject.cft));

          // Coba lagi permintaan awal yang gagal
          result = await BASE_QUERY_REDUX(args, api, extraOptions);
        } else {
          await BASE_QUERY_REDUX(
            { url: API_QUERY_PATH.auth.logout, method: "POST" },
            api,
            extraOptions
          );
        }
      } finally {
        // Buka kunci mutex setelah selesai
        release();
      }
    } else {
      // Jika mutex sudah terkunci, tunggu dan coba lagi permintaan awal
      await mutex.waitForUnlock();
      result = await BASE_QUERY_REDUX(args, api, extraOptions);
    }
  }

  return result;
};
