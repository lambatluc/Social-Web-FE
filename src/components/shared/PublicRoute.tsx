import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute - Component bảo vệ các route authentication
 * Chỉ cho phép người dùng chưa đăng nhập truy cập (sign-in, sign-up)
 * Nếu đã đăng nhập, chuyển hướng về trang Home (/)
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
