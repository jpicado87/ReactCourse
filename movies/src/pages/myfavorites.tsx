import Image from "next/image";

import { ProtectedPage } from "@/components/layouts/ProtectedPage";
import { useMoviesContext } from "@/contexts/movies-context";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import React from "react";

export default function Home() {
  const { myFavoritesMovies } = useMoviesContext();
  const { user } = useFirebaseAuth();

  return (
    // <ProtectedPage>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className="text-4xl font-bold text-center">My Favorite Movies</h1>
      <ul className="flex flex-wrap">
        {myFavoritesMovies.map((movie) => (
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
            </div>
          </li>
        ))}
      </ul>
    </main>
    // </ProtectedPage>
  );
}
