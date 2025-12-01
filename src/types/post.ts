import { IUser } from "./user";

export interface ICreatePost {
  caption: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
}
export interface IPost extends ICreatePost {
  id: string;
  createdAt: string;
  updatedAt: string;
  creator: IUser;
  likes: number;
  isLiked: boolean;
}
