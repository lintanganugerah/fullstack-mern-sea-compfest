import {
  useGetAllTestimoniQuery,
  useGetSpecificTestimoniQuery,
} from "redux/apiQuery/testimonialApi";

export default function useTestimonial(id: string) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    status,
    requestId,
    isSuccess,
    isFetching,
  } = useGetSpecificTestimoniQuery(id);

  return {
    data: data?.responseObject ?? [],
    isLoading,
    isError,
    refetch,
    status,
    requestId,
    isSuccess,
    isFetching,
  };
}

export function useAllTestimonial() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    status,
    requestId,
    isSuccess,
    isFetching,
  } = useGetAllTestimoniQuery();

  return {
    data: data?.responseObject ?? [],
    isLoading,
    isError,
    refetch,
    status,
    requestId,
    isSuccess,
    isFetching,
  };
}
