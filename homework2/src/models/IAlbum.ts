import { IPhoto } from "./IPhoto";
import { IUser } from "./IUser";

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
  user?: IUser;
  photos?: IPhoto[];
}
