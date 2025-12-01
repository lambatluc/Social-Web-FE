import { createPost } from "@/api/post";
import { ApiError, ICreatePost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const navigate = useNavigate();
  return useMutation<string, ApiError<ICreatePost>, ICreatePost>({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Tạo bài viết thành công");
      navigate("/", { replace: true });
    },
  });
};
