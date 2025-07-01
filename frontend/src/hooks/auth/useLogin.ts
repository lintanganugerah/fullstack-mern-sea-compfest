import { useLoginMutation } from "redux/apiQuery/authApi";
import { toast } from "react-toastify";
import type { LoginFormData } from "modules/auth/types/loginTypes";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export function useLogin() {
  const [loginTrigger, { isLoading: loading }] = useLoginMutation();

  const login = (formData: LoginFormData) => {
    return loginTrigger(formData)
      .unwrap()
      .then(() => {
        toast.success("Login success.");
      })
      .catch((err) => {
        const message =
          (err?.data as BaseApiResponseTypes)?.message ||
          err?.error ||
          "Login failed. Please try again.";
        if (err?.statusCode >= 500) {
          toast.error("Internal Server Error");
        }
        toast.error(message);
      });
  };

  return { login, loading };
}
