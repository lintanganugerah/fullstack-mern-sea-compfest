/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { useStorage } from "./useStorage";
import {
  useLazyVerifyAdminQuery,
  useLazyVerifyAuthQuery,
} from "../redux/apiQuery/authApi";
import {
  removeCurrentCsrfToken,
  removeCurrentJwtToken,
} from "../redux/slice/authSlice";

import { removeUserState } from "redux/slice/userSlice";
import { aliasName } from "../utils/aliasName";

export function useAuthCheck(role: "user" | "admin" = "user") {
  const { token } = useStorage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [triggerVerifyAuth] = useLazyVerifyAuthQuery();
  const [triggerVerifyAdmin] = useLazyVerifyAdminQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const trigger =
          role === "admin" ? triggerVerifyAdmin : triggerVerifyAuth;

        const data = await trigger().unwrap();

        if (!data.success) throw new Error(data.message);

        Cookies.set(aliasName["auth_cache"], Date.now().toString(), {
          expires: 1 / 720, // 2 menit
        });

        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        Cookies.remove(aliasName["auth_cache"]);

        if (role === "admin") {
          // Token valid tapi bukan admin
          toast.error("Access denied");
          setIsAuthenticated(false);
          navigate("/", { replace: true });
        } else {
          // Token invalid
          toast.error("Session expired. Please login again.");
          dispatch(removeCurrentJwtToken());
          dispatch(removeCurrentCsrfToken());
          dispatch(removeUserState());
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
        }
      }
    };

    if (!token) {
      setIsAuthenticated(false);
      Cookies.remove(aliasName["auth_cache"]);
      return;
    }

    const cachedAt = Cookies.get(aliasName["auth_cache"]);
    const cacheDuration = Number(import.meta.env.VITE_AUTH_CACHE_DURATION_MS);

    if (cachedAt && Date.now() - parseInt(cachedAt, 10) < cacheDuration) {
      setIsAuthenticated(true);
      return;
    }

    verify();
  }, [token, role]);

  return { isAuthenticated };
}
