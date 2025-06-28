import { useEffect, useState } from "react";
import {
  useLazyGetAllTestimoniQuery,
  useLazyGetSpecificTestimoniQuery,
} from "redux/apiQuery/testimonialApi";
import type { Testimonial } from "modules/user/types/TestimonialTypes";

type UseTestimonialsDataProps = { type: "all" } | { type: "one"; id: string };

export function useTestimonialsFetch(props: UseTestimonialsDataProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

  const [triggerGetAll, { isLoading: loadingAll, isError: errorAll }] =
    useLazyGetAllTestimoniQuery();
  const [triggerGetOne, { isLoading: loadingOne, isError: errorOne }] =
    useLazyGetSpecificTestimoniQuery();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (props.type === "all") {
          const res = await triggerGetAll().unwrap();
          if (res.success && Array.isArray(res.responseObject)) {
            setTestimonials(res.responseObject);
          }
        } else if (props.type === "one" && props.id) {
          const res = await triggerGetOne(props.id).unwrap();
          if (res.success && res.responseObject) {
            setTestimonial(res.responseObject);
          }
        }
      } catch (err) {
        console.error("Fetch testimonial error:", err);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return {
    data: props.type === "all" ? testimonials : testimonial,
    isLoading: props.type === "all" ? loadingAll : loadingOne,
    isError: props.type === "all" ? errorAll : errorOne,
    setTestimonials,
  };
}
