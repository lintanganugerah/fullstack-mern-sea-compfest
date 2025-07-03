import type { CreateTestimonial } from "modules/user/types/TestimonialTypes";
import { toast } from "react-toastify";
import { useCreateTestimoniMutation } from "redux/apiQuery/testimonialApi";

export function useCreateTestimonial() {
  const [triggerPost, { isLoading, isError, isSuccess }] =
    useCreateTestimoniMutation();

  const createTestimoni = (create: CreateTestimonial) => {
    return triggerPost(create)
      .unwrap()
      .then(() => {
        toast.success("Create Review success.");
      })
      .catch((err) => {
        // Logika CSRF sudah hilang! Hook ini hanya menangani error aplikasi.
        const message = err?.data?.message || "Create Review failed.";

        if (err?.status >= 500) {
          toast.error("Internal Server Error");
        } else {
          toast.error(message);
        }
      });
  };

  return { createTestimoni, isLoading, isError, isSuccess };
}
