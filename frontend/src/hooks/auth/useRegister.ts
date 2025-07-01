import { useRegisterMutation } from "redux/apiQuery/authApi";
import { toast } from "react-toastify";
import type {
  RegisterFormData,
  RegisterResponse,
} from "modules/auth/types/registerTypes";

export function useRegister() {
  const [registerTrigger, { isLoading: loading }] = useRegisterMutation();

  const register = (formData: RegisterFormData) => {
    return registerTrigger(formData)
      .unwrap()
      .then(() => {
        toast.success("Register success.");
      })
      .catch((err) => {
        const message =
          (err?.data as RegisterResponse)?.message ||
          err?.error ||
          "Register failed. Please try again.";
        if (err?.statusCode >= 500) {
          toast.error("Internal Server Error");
        } else {
          toast.error(message);
        }
      });
  };

  return { register, loading };
}
