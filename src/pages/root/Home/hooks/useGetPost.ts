import { getPost } from "@/api/post";
import { IPost, IPrams, Pagination } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = (params: IPrams) =>
  useQuery<Pagination<IPost>>({
    queryKey: ["getPost", params],
    queryFn: () => getPost(params),
  });
