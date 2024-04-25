import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "../../utils/request";
import Head from "next/head";
import { useMovieContext } from "../../contexts/MovieContext";
import MovieCountBadge from "../../components/MovieCountBadge";

function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { myMovies, addMovie, removeMovie } = useMovieContext();

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
      <div className="flex justify-between items-center pt-10 pb-4">
        <div className="flex-1">
          <div className="flex justify-start items-center gap-3">
            <Link className="text-blue-500" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </Link>
            <h1 className="text-4xl font-bold">
              <Link href="/solution" className="text-blue-500 pr-3">
                Movies List
              </Link>
              My Movies
            </h1>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-3">
          <Link
            href="/solution/my-movies"
            className="text-white bg-blue-500 px-4 py-2 rounded-lg relative"
          >
            My Movies{" "}
            {myMovies.length > 0 && <MovieCountBadge count={myMovies.length} />}
          </Link>
        </div>
      </div>
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
