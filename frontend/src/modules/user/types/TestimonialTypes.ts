import type { BaseApiResponseTypes } from "types/BaseApiResponse";
import z from "zod";
import type {
  CreateTestimoniSchemaZod,
  TestimoniSchemaZod,
} from "../zod/testimoniSchema";

export type Testimonial = z.infer<typeof TestimoniSchemaZod>;

export type TestimonialResponseAll = BaseApiResponseTypes & {
  responseObject: Testimonial[];
};

export type TestimonialResponseOne = BaseApiResponseTypes & {
  responseObject: Testimonial;
};

export type CreateTestimonial = z.infer<typeof CreateTestimoniSchemaZod>;

export type CreateTestimonialResponse = TestimonialResponseOne;
