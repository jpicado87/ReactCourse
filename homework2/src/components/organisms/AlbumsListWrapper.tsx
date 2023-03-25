import React from "react";
import axios from "axios";
import { IAlbum } from "../../models/IAlbum";
import { IUser } from "../../models/IUser";
import { IPhoto } from "../../models/IPhoto";
import { AlbumsList } from "../molecules/AlbumsList";

export const AlbumsListWrapper = () => {
  const [albums, setAlbums] = React.useState<IAlbum[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getAlbums = async () => {
    try {
      // Make the Request
      const [users, albums, photos] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/albums"),
        axios.get("https://jsonplaceholder.typicode.com/photos"),
      ]);

      const albumsWithUsersAndPhotos = (albums.data as IAlbum[]).map(
        (album) => {
          const albumUser = (users.data as IUser[]).find(
            (user) => user.id === album.userId
          );

          const albumPhotos = (photos.data as IPhoto[]).filter(
            (photo) => photo.albumId === album.id
          );

          return {
            ...album,
            user: albumUser,
            photos: albumPhotos,
          };
        }
      );

      // Save in the state
      setAlbums(albumsWithUsersAndPhotos);

      // Change loading state
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //componentDidMount
  React.useEffect(() => {
    getAlbums();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AlbumsList albums={albums} />;
};
