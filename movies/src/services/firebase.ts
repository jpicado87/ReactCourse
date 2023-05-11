import { IMovie } from "@/contexts/movies-context";
import { User } from "firebase/auth";
import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "favorites"), {
      userId: firebaseUser.uid,
      ...movie,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const saveMovieReview = async (
  movie: IMovie,
  firebaseUser: User,
  rating: number,
  review: string
) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "reviews"), {
      userId: firebaseUser.uid,
      rating: rating,
      review: review,
      ...movie,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async (firebaseUser: User) => {
  const movies: IMovie[] = [];
  if (firebaseUser) {
    const firebaseQuery = query(
      collection(getFirestore(), "favorites"),
      where("userId", "==", firebaseUser.uid)
    );

    const querySnapshot = await getDocs(firebaseQuery);

    querySnapshot.forEach((doc) => {
      movies.push({ ...(doc.data() as IMovie) });
    });
  }

  return movies;
};

export const getReviews = async (firebaseUser: User) => {
  const movies: IMovie[] = [];
  if (firebaseUser) {
    const firebaseQuery = query(
      collection(getFirestore(), "reviews"),
      where("userId", "==", firebaseUser.uid)
    );

    const querySnapshot = await getDocs(firebaseQuery);

    querySnapshot.forEach((doc) => {
      movies.push({ ...(doc.data() as IMovie) });
    });
  }

  return movies;
};
