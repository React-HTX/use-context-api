import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useMovieContext } from "../../contexts/MovieContext";

import {
  getTrendingMovies,
  getGenres,
  getMoviesByGenre,
} from "../../utils/request";
import MovieCountBadge from "../../components/MovieCountBadge";

function MovieList() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  // useContext to get the movie context
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

  // fetch movies and genres
  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        const genres = await getGenres();
        setMovies(trendingMovies);
        setIsLoading(false); // Move loading state update here after movies are fetched
        setGenres(genres);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (selectedGenre === "all") {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
        return;
      }

      const moviesByGenre = await getMoviesByGenre(selectedGenre);
      setMovies(moviesByGenre);
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  // useEffect to filter movies based on genre
  if (isLoading) {
    return <div className="text-center">Loading movies...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    // Implement filtering logic here if you want to filter movies based on the selected genre
  };

  return (
    <>
      {/* Quick Note: Using the Head component in Next.js does not require useEffect because it's a static declaration of metadata for the page. */}
      <Head>
        <title>Trending Movies</title>
        <meta name="description" content="List of trending movies" />
      </Head>
      <div className="container max-w-7xl mx-auto px-4">
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
              <h1 className="text-4xl font-bold">Trending Movies</h1>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-3">
            <label
              htmlFor="genre-select"
              className="block mb-2 text-sm font-medium text-white sr-only"
            >
              Select genre
            </label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <Link
              href="/solution/my-movies"
              className="text-white bg-blue-500 px-4 py-2 rounded-lg relative"
            >
              My Movies{" "}
              {myMovies.length > 0 && (
                <MovieCountBadge count={myMovies.length} />
              )}
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-x-12 gap-y-2">
          {movies.map((movie) => {
            const isMovieInList = myMovies.some(
              (myMovie) => myMovie.id === movie.id
            );

            return (
              <li key={movie.id} className="mb-6">
                <div className="relative">
                  <Link href={`/solution/${movie.id}`} passHref>
                    <div className="hover:scale-105 hover:transition-transform duration-300">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="mt-2 rounded-xl shadow-lg border border-gray-900"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-80 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <div className="pt-5 pb-6">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p className="truncate overflow-hidden whitespace-nowrap">
                      {movie.overview}
                    </p>
                    <button
                      className={`mt-4 w-full ${
                        isMovieInList ? "bg-red-500" : "bg-blue-500"
                      } text-white px-4 py-2 rounded-lg`}
                      onClick={() => handleToggleMovie(movie)}
                    >
                      {isMovieInList
                        ? "Remove from my movies"
                        : "Add to my movies"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MovieList;
