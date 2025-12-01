import { api } from "@/lib/api";
import { ICreatePost, IPost, IPrams, Pagination } from "@/types";

export const createPost = (post: ICreatePost): Promise<string> =>
  api.post("/posts", post);

export const getPost = (params: IPrams): Promise<Pagination<IPost>> =>
  api.get("/posts", { params });

export const likePost = (id: string): Promise<string> =>
  api.post(`/posts/${id}/like`);

export const unlikePost = (id: string): Promise<string> =>
  api.delete(`/posts/${id}/unlike`);


