import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_QUERY_REAUTH } from "constant/ApiBaseURI";
import { API_QUERY_PATH } from "constant/ApiQueryPath";
import {
  type CreateMealPlan,
  type CreateMealPlanResponse,
  type MealPlanGetAllResponse,
  type MealPlanGetOneResponse,
  type UpdateMealPlanResponse,
} from "modules/user/types/MealPlanTypes";

export const MealplanApi = createApi({
  reducerPath: "MealplanAPI",
  baseQuery: BASE_QUERY_REAUTH,
  tagTypes: ["MealplanAll", "MealPlanDetail"],
  endpoints: (builder) => ({
    getAllMealplan: builder.query<MealPlanGetAllResponse, void>({
      query: () => ({
        url: API_QUERY_PATH.mealplan.get,
        method: "GET",
        providesTags: ["MealPlanAll"],
      }),
    }),
    getDetailMealplan: builder.query<MealPlanGetOneResponse, string>({
      query: (id) => ({
        url: API_QUERY_PATH.mealplan.getDetail(id),
        method: "GET",
        providesTags: ["MealPlanDetail"],
      }),
    }),
    createMealplan: builder.mutation<CreateMealPlanResponse, CreateMealPlan>({
      query: (body) => ({
        url: API_QUERY_PATH.mealplan.create,
        method: "POST",
        body: body,
        invalidateTags: ["MealPlanAll", "MealPlanDetail"],
      }),
    }),
    updateMealplan: builder.mutation<UpdateMealPlanResponse, CreateMealPlan>({
      query: (body) => ({
        url: API_QUERY_PATH.mealplan.create,
        method: "POST",
        body: body,
        invalidateTags: ["MealPlanAll", "MealPlanDetail"],
      }),
    }),
  }),
});

export const {
  useGetAllMealplanQuery,
  useLazyGetAllMealplanQuery,
  useGetDetailMealplanQuery,
  useLazyGetDetailMealplanQuery,
  useCreateMealplanMutation,
} = MealplanApi;
