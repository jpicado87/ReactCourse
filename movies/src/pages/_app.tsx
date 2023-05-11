import { FirebaseAuthContextProvider } from "@/contexts/firebase-auth-context";
import { FirebaseContextProvider } from "@/contexts/firebase-context";
import { MoviesContextProvider } from "@/contexts/movies-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseContextProvider>
      <FirebaseAuthContextProvider>
        <MoviesContextProvider>
          <Component {...pageProps} />
        </MoviesContextProvider>
      </FirebaseAuthContextProvider>
    </FirebaseContextProvider>
  );
}
