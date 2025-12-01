import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Component bảo vệ các route private
 * Chỉ cho phép người dùng đã đăng nhập truy cập
 * Nếu chưa đăng nhập, chuyển hướng về /sign-in
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};
