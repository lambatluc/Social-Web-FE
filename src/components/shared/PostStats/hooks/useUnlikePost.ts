import { unlikePost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";

export const useUnlikePost = (id: string) => {
  return useMutation<string>({
    mutationFn: () => unlikePost(id),
  });
};
