import { BASE_QUERY_REDUX } from "constant/ApiBaseURI";
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_QUERY_PATH } from "constant/ApiQueryPath";
import type {
  TestimonialResponseAll,
  TestimonialResponseOne,
} from "modules/user/types/TestimonialTypes";

export const testimonialAPI = createApi({
  reducerPath: "TestimonialAPI",
  baseQuery: BASE_QUERY_REDUX,
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    getAllTestimoni: builder.query<TestimonialResponseAll, void>({
      query: () => ({
        url: API_QUERY_PATH.testimoni.get,
        method: "GET",
      }),
    }),
    getSpecificTestimoni: builder.query<TestimonialResponseOne, string>({
      query: (id) => ({
        url: `${API_QUERY_PATH.testimoni.get}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllTestimoniQuery, useLazyGetSpecificTestimoniQuery } =
  testimonialAPI;
