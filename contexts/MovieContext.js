import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

// Bonus: useMovieContext is a custom hook that calls returns the MovieContext. Why are we exporting this function?
export const useMovieContext = () => useContext(MovieContext);

// Problem 1: Create a context provider for the MovieContext.

// The Context Provider is the component that wraps your app and provides the context values. Another way to look at it is that the Context Provider is a functional component that provides the context values to the rest of the app. Notice the use of useState and the return statement. The return statement should return the MovieContext.Provider component with the value prop set to an object with the myMovies state and the addMovie and removeMovie functions.

// ....................
// const [myMovies, setMyMovies] = useState([]);

// const addMovie = (newMovie) => {
//   // Check if the movie already exists
//   if (!myMovies.some((movie) => movie.id === newMovie.id)) {
//     setMyMovies((prevMovies) => [...prevMovies, newMovie]);
//   }
// };

// const removeMovie = (movieId) => {
//   // Check if the movie exists before removing it
//   if (myMovies.some((movie) => movie.id === movieId)) {
//     setMyMovies((prevMovies) =>
//       prevMovies.filter((movie) => movie.id !== movieId)
//     );
//   }
// };

// return <></>;
// ....................

export default MovieContext;
