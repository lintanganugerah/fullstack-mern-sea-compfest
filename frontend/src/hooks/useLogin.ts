import { useLoginMutation } from "redux/apiQuery/authApi";
import { useState } from "react";
import { toast } from "react-toastify";
import type { LoginFormData } from "modules/auth/types/loginTypes";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export function useLogin() {
  const [loginTrigger] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const login = (formData: LoginFormData) => {
    setLoading(true);
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
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { login, loading };
}
