import { aliasName } from "utils/aliasName";
import { BASE_QUERY_REAUTH } from "constant/ApiBaseURI";
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_QUERY_PATH } from "constant/ApiQueryPath";
import type {
  CreateTestimonial,
  CreateTestimonialResponse,
  TestimonialResponseAll,
  TestimonialResponseOne,
} from "modules/user/types/TestimonialTypes";

export const testimonialAPI = createApi({
  reducerPath: "TestimonialAPI",
  baseQuery: BASE_QUERY_REAUTH,
  tagTypes: ["Testimonial", "TestimonialAll"],
  endpoints: (builder) => ({
    getAllTestimoni: builder.query<TestimonialResponseAll, void>({
      query: () => ({
        url: API_QUERY_PATH.testimoni.get,
        method: "GET",
        providesTags: ["TestimonialAll"],
      }),
      keepUnusedDataFor: 180,
    }),
    getSpecificTestimoni: builder.query<TestimonialResponseOne, string>({
      query: (id) => ({
        url: `${API_QUERY_PATH.testimoni.get}/${id}`,
        method: "GET",
        providesTags: ["Testimonial"],
      }),
      keepUnusedDataFor: 1800,
    }),
    createTestimoni: builder.mutation<
      CreateTestimonialResponse,
      CreateTestimonial
    >({
      query: (testimoni) => {
        const data = localStorage.getItem("persist:root");
        const csrfKey = aliasName["csrf_token"];

        const parsed = data ? JSON.parse(JSON.parse(data).auth) : {};
        const token = parsed?.token ?? "";
        const csrfToken = parsed?.[csrfKey] ?? "";

        return {
          url: `${API_QUERY_PATH.testimoni.create}`,
          method: "POST",
          body: testimoni,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-CSRF-TOKEN": csrfToken,
          },
        };
      },
      invalidatesTags: ["TestimonialAll", "Testimonial"],
    }),
  }),
});

export const {
  useGetAllTestimoniQuery,
  useGetSpecificTestimoniQuery,
  useLazyGetAllTestimoniQuery,
  useLazyGetSpecificTestimoniQuery,
  useCreateTestimoniMutation,
} = testimonialAPI;
