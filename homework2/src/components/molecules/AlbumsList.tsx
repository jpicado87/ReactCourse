import React from "react";
import { IAlbum } from "../../models/IAlbum";
import { Album } from "./Album";

export interface IAlbumsListProps {
  albums: IAlbum[];
}

export const AlbumsList: React.FC<IAlbumsListProps> = ({ albums }) => {
  return (
    <ul>
      {albums.map((album) => (
        <Album key={`${album.id}-${album.userId}`} album={album} />
      ))}
    </ul>
  );
};
