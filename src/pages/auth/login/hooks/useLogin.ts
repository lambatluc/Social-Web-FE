import { login } from "@/api/auth";
import { Storage } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { ApiError, ILogin, ILoginResponse } from "@/types";
import { setStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthStatus } = useAuthStore();
  return useMutation<ILoginResponse, ApiError<ILogin>, ILogin>({
    mutationFn: login,
    onSuccess: ({ access_token, refresh_token, user }) => {
      setStorage(Storage.token, { access_token, refresh_token });
      setStorage(Storage.user, user);

      setAuthStatus({ isAuthenticated: true });
      toast.success("Đăng nhập thành công");

      navigate("/", { replace: true });
    },
  });
};
