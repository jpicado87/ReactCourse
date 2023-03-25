import React from "react";
import { IPhoto } from "../../models/IPhoto";

interface IPhotoProps {
  photo: IPhoto;
}

export const Photo: React.FC<IPhotoProps> = ({ photo }) => {
  return (
    <li>
      <p>Photo # {photo.id}</p>
      <h3>{photo.title}</h3>
      <p>{photo.thumbnailUrl}</p>
    </li>
  );
};
