import { User } from "./User";
import { PostImage } from "@/model/PostImage";

interface UserID {
  userId: string;
}

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
}
