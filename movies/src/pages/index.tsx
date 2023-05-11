import Image from "next/image";

import { ProtectedPage } from "@/components/layouts/ProtectedPage";
import { IMovie, useMoviesContext } from "@/contexts/movies-context";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { saveFavoriteMovie, saveMovieReview } from "@/services/firebase";
import { User } from "firebase/auth";
import { TextInput } from "@/components/atoms/TextInput";
import { Button, FormControl, Stack } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { popularMovies } = useMoviesContext();
  const { user } = useFirebaseAuth();
  const router = useRouter();

  const handleReviewSubmit = (movie: IMovie, user: User) => {
    try {
      const ratingInput = document.getElementById(
        movie.id + "_rating"
      ) as HTMLInputElement;
      const reviewInput = document.getElementById(
        movie.id + "_review"
      ) as HTMLInputElement;

      saveMovieReview(
        movie,
        user,
        Number(ratingInput.value),
        reviewInput.value
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedPage>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1 className="text-4xl font-bold text-center">Popular Movies</h1>
        <ul className="flex flex-wrap">
          <div>
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={() => router.push("/myreviews")}>
                My Reviews
              </Button>
              <Button
                variant="text"
                onClick={() => router.push("/myfavorites")}
              >
                My Favorites
              </Button>
            </Stack>
          </div>
        </ul>
        <ul className="flex flex-wrap">
          {popularMovies.map((movie) => (
            <li key={movie.id}>
              <div>
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={400}
                  />
                </div>
                <div>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <label>
                      Rating:
                      <input
                        id={movie.id + "_rating"}
                        type="number"
                        max={5}
                        min={1}
                        defaultValue={"Rating"}
                        style={{ border: "1px solid black" }}
                      ></input>
                    </label>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <TextInput
                      id={movie.id + "_review"}
                      type="text"
                      label="Review"
                      margin="normal"
                      multiline
                      rows={2}
                    ></TextInput>
                  </FormControl>
                </div>
                <div>
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => user && handleReviewSubmit(movie, user)}
                    >
                      Save Review
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => user && saveFavoriteMovie(movie, user)}
                    >
                      Add to Favorites
                    </Button>
                  </Stack>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </ProtectedPage>
  );
}
