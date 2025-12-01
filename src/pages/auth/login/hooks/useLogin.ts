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
    onSuccess: ({ tokens, user }) => {
      setStorage(Storage.token, tokens);
      setStorage(Storage.user, user);

      setAuthStatus({ isAuthenticated: true });
      toast.success("Đăng nhập thành công");

      navigate("/", { replace: true });
    },
  });
};
