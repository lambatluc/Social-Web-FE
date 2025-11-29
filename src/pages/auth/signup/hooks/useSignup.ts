import { signup } from "@/api/auth";
import { ApiError, ISignup } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const nav = useNavigate();
  return useMutation<void, ApiError<ISignup>, ISignup>({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Sign up successfully");
      nav(-1);
    },
  });
};
