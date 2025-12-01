import { likePost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = (id: string) => {
  return useMutation<string>({
    mutationFn: () => likePost(id),
  });
};
