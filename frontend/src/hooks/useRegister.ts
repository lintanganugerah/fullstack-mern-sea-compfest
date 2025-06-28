import { useRegisterMutation } from "redux/apiQuery/authApi";
import { useState } from "react";
import { toast } from "react-toastify";
import type {
  RegisterFormData,
  RegisterResponse,
} from "modules/auth/types/registerTypes";

export function useRegister() {
  const [registerTrigger] = useRegisterMutation();
  const [loading, setLoading] = useState(false);

  const register = (formData: RegisterFormData) => {
    setLoading(true);
    return registerTrigger(formData)
      .unwrap()
      .then(() => {
        toast.success("register success.");
      })
      .catch((err) => {
        const message =
          (err?.data as RegisterResponse)?.message ||
          err?.error ||
          "register failed. Please try again.";
        if (err?.statusCode >= 500) {
          toast.error("Internal Server Error");
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { register, loading };
}
