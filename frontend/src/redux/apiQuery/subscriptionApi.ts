import { createApi } from "@reduxjs/toolkit/query/react";
import { API_QUERY_PATH } from "./../../constant/ApiQueryPath";
import { BASE_QUERY_REAUTH } from "constant/ApiBaseURI";
import type {
  CreateSubscription,
  CreateSubscriptionResponse,
  SubscriptionAllResponse,
} from "modules/user/types/SubscriptionTypes";

export const subscriptionApi = createApi({
  reducerPath: "SubscriptionApi",
  baseQuery: BASE_QUERY_REAUTH,
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    createSubs: builder.mutation<
      CreateSubscriptionResponse,
      CreateSubscription
    >({
      query: (subs) => ({
        url: API_QUERY_PATH.subscription.create,
        method: "POST",
        body: subs,
      }),
    }),
    getAllSubs: builder.query<SubscriptionAllResponse, void>({
      query: () => ({
        url: API_QUERY_PATH.subscription.get,
        method: "GET",
        providedTags: ["Subscription"],
      }),
    }),
  }),
});

export const {useCreateSubsMutation, useLazyGetAllSubsQuery, useGetAllSubsQuery} = subscriptionApi