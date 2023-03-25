import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  author?: IUser;
  comments?: IComment[];
}

export interface IPostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}
