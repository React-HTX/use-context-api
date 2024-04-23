import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [myMovies, setMyMovies] = useState([]);

  const addMovie = (newMovie) => {
    console.log("newMovie:", newMovie);
    // Check if the movie already exists
    if (!myMovies.some((movie) => movie.id === newMovie.id)) {
      setMyMovies((prevMovies) => [...prevMovies, newMovie]);
    }
  };

  const removeMovie = (movieId) => {
    // Check if the movie exists before removing it
    if (myMovies.some((movie) => movie.id === movieId)) {
      setMyMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    }
  };

  return (
    <MovieContext.Provider value={{ myMovies, addMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
