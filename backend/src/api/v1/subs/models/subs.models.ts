import { Schema, model } from "mongoose";
import { SubscriptionMongoDataType } from "../types/subs.types";

export const SubscriptionSchemaMongo = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    mealPlanId: {
      type: Schema.Types.ObjectId,
      ref: "MealPlan",
      required: true,
    },
    mealTypes: {
      type: [String],
      enum: ["breakfast", "lunch", "dinner"],
      required: true,
    },
    deliveryDays: {
      type: [String],
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: true,
    },
    allergies: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const SubscriptionModel = model<SubscriptionMongoDataType>(
  "Subscription",
  SubscriptionSchemaMongo
);
