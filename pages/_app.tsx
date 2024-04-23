import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Import MovieProvider from the MovieContext
import { MovieProvider } from "../contexts/MovieContext";

export default function App({ Component, pageProps }: AppProps) {
  // Render the MovieProvider wrapping the entire app
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}
