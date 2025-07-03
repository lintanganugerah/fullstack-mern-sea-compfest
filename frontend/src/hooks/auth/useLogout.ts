import { useLogoutMutation } from "redux/apiQuery/authApi";
import { useState } from "react";
import { toast } from "react-toastify";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export function useLogout() {
  const [logoutTrigger] = useLogoutMutation();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    return logoutTrigger()
      .unwrap()
      .then(() => {
        toast.success("Logout success.");
      })
      .catch((err) => {
        const message =
          (err?.data as BaseApiResponseTypes)?.message ||
          err?.error ||
          "Logout failed. Please try agaout.";
        if (err?.statusCode >= 500) {
          toast.error("internal Server Error");
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { logout, loading };
}
