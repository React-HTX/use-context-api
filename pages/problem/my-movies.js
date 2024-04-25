/* **********************
import Head from "next/head";
import Link from "next/link";

function MovieList() {
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

  if (!myMovies || myMovies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  return (
    <>
      <Head>
        <title>Movie List</title>
        <meta name="description" content="List of trending movies" />
      </Head>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between pt-10 pb-4">
          <div>
            <h1 className="text-4xl font-bold">My Movies</h1>
            <Link className="text-blue-500" href="/">
              Back to Home
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-x-12 gap-y-2">
          {myMovies.map((movie) => {
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
********************** */
