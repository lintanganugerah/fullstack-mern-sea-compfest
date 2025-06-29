import { useEffect, useState } from "react";
import { useLazyGetAllTestimoniQuery } from "redux/apiQuery/testimonialApi";
import type { Testimonial } from "modules/user/types/TestimonialTypes";

export function useFetchAllTestimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [trigger, { isLoading, isError }] = useLazyGetAllTestimoniQuery();

  const fetch = async () => {
    try {
      const res = await trigger().unwrap();
      if (res.success && Array.isArray(res.responseObject)) {
        setData(res.responseObject);
      }
    } catch (err) {
      console.error("Failed to fetch all testimonials", err);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    isError,
    refetch: fetch,
  };
}
