import Axios from "axios";
import React from "react";
import { getFavorites, getReviews } from "@/services/firebase";
import { useFirebaseAuth } from "./firebase-auth-context";
import { User } from "@firebase/auth";

const MOVIESDB_API_KEY = "2a2e83f1997f3263461520241fbdc619";
const MOVIESDB_API_KEY_V4_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTJlODNmMTk5N2YzMjYzNDYxNTIwMjQxZmJkYzYxOSIsInN1YiI6IjYzNTQwY2I4ODgwYzkyMDA3OTZkN2RlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S6_H0jSf05o1u5vWxHkCrl7B6SW3OR170PcYejsa4_Y";

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface MoviesContextProps {
  popularMovies: IMovie[];
  myFavoritesMovies: IMovie[];
  myMoviesReviews: IMovie[];
}
const MoviesContext = React.createContext<MoviesContextProps>({
  popularMovies: [],
  myFavoritesMovies: [],
  myMoviesReviews: [],
});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useFirebaseAuth();
  const [popularMovies, setPopularMovies] = React.useState<IMovie[]>([]);
  const [myFavoritesMovies, setMyFavoritesMovies] = React.useState<IMovie[]>(
    []
  );
  const [myMoviesReviews, setMyMoviesReviews] = React.useState<IMovie[]>([]);
  const getPopularMovies = React.useCallback(async () => {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIESDB_API_KEY}&language=en-US&page=1`
    );
    console.log(response.data.results);
    setPopularMovies(response.data.results);
  }, []);
  const getMyFavoritesMovies = React.useCallback(async () => {
    const response = await getFavorites(user as User);
    console.log(response);
    setMyFavoritesMovies(response);
  }, [user]);
  const getMyMoviesReviews = React.useCallback(async () => {
    const response = await getReviews(user as User);
    console.log(response);
    setMyMoviesReviews(response);
  }, [user]);

  React.useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  React.useEffect(() => {
    getMyFavoritesMovies();
  }, [getMyFavoritesMovies]);

  React.useEffect(() => {
    getMyMoviesReviews();
  }, [getMyMoviesReviews]);

  const contextValue = React.useMemo(
    () => ({
      popularMovies,
      myFavoritesMovies,
      myMoviesReviews,
    }),
    [popularMovies, myFavoritesMovies, myMoviesReviews]
  );

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () =>
  React.useContext<MoviesContextProps>(MoviesContext);
