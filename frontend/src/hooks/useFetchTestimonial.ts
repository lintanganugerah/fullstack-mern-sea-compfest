import { useEffect, useState } from "react";
import { useLazyGetSpecificTestimoniQuery } from "redux/apiQuery/testimonialApi";
import type { Testimonial } from "modules/user/types/TestimonialTypes";

export function useFetchTestimonial(id: string) {
  const [data, setData] = useState<Testimonial | null>(null);
  const [trigger, { isLoading, isError }] = useLazyGetSpecificTestimoniQuery();

  const fetch = async () => {
    try {
      const res = await trigger(id).unwrap();
      if (res.success && res.responseObject) {
        setData(res.responseObject);
      }
    } catch (err) {
      console.error("Failed to fetch testimonial", err);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    data,
    isLoading,
    isError,
    refetch: fetch,
  };
}
