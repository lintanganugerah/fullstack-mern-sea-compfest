import { Navigate, Outlet } from "react-router-dom";
import { useStorage } from "hooks/useStorage";

//Guard khusus login dan register agar tidak bisa diakses ketika sudah login
export default function RequireNoAuth() {
  const { token } = useStorage();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
