import { InferSchemaType, Schema } from "mongoose";
import { SubscriptionSchemaMongo } from "../models/subs.models";
import { subscriptionSchemaZod } from "../zod/subs.zod";
import z from "zod";

export type Subscription = z.infer<typeof subscriptionSchemaZod>;

export type SubscriptionMongoDataType = InferSchemaType<
  typeof SubscriptionSchemaMongo
> & {
  _id: string | Schema.Types.ObjectId;
};

export type CreateSubscriptionInput = Subscription & {
  totalPrice: number;
};
