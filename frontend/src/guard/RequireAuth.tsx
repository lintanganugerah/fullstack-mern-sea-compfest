import { Navigate, Outlet } from "react-router-dom";
import { useAuthCheck } from "hooks/useAuthCheck";
import { toast } from "react-toastify";

export default function RequireAuth() {
  const { isAuthenticated } = useAuthCheck("user");

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (isAuthenticated === true) {
    return <Outlet />;
  }

  toast.error("Please login to access subscription page");
  return <Navigate to="/login" replace />;
}
