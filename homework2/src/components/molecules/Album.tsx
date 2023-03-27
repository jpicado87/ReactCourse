import React from "react";
import { IAlbum } from "../../models/IAlbum";
import { Photo } from "./Photo";

interface IAlbumProps {
  album: IAlbum;
}

export const Album: React.FC<IAlbumProps> = ({ album }) => {
  const renderPhotos = () => {
    if (!album.photos || album.photos.length === 0) {
      return null;
    }

    return (
      <ul>
        {album.photos.map((photo) => {
          return <Photo key={`${photo.id}-${photo.albumId}`} photo={photo} />;
        })}
      </ul>
    );
  };
  return (
    <li>
      <p>Album # {album.id}</p>
      <h2>{album.title}</h2>

      {renderPhotos()}
    </li>
  );
};
