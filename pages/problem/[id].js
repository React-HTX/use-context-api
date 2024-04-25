/* **********************
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "../../utils/request";
import Head from "next/head";

function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // There isn't a parent component to pass the myMovies state and the addMovie and removeMovie functions as props. We need to use the useMovieContext hook to access the context values.

  const handleToggleMovie = (movie) => {
    // Check if the movie is in myMovies list
    const isMovieInList = myMovies.some((myMovie) => myMovie.id === movie.id);

    if (isMovieInList) {
      // If the movie is already in myMovies list, remove it
      removeMovie(movie.id);
    } else {
      // If the movie is not in myMovies list, add it
      addMovie(movie);
    }
  };

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;
      setIsLoading(true);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Loading movie details...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        Failed to load the movie details. Please try again later.
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center">No movie found.</div>;
  }

  const isMovieInList = myMovies.some((myMovie) => myMovie.id === movie.id);

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <Head>
        <title>{movie ? `${movie.title} - Movie Details` : "Loading..."}</title>
      </Head>
      <Link className="text-blue-500" href="/solution">
        Back to movies
      </Link>
      <div className="flex justify-start gap-6 items-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="mt-4 rounded-xl border-2 border-gray-900 shadow-lg"
          priority
        />
        <div className="w-1/2 h-full">
          <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
          <p className="mt-4">{movie.overview}</p>{" "}
          <button
            className={`mt-4 w-full ${
              isMovieInList ? "bg-red-500" : "bg-blue-500"
            } text-white px-4 py-2 rounded-lg`}
            onClick={() => handleToggleMovie(movie)}
          >
            {isMovieInList ? "Remove from my movies" : "Add to my movies"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
* **********************/
