import { findIfMovieOrSerie } from "./findIfMovieOrSerie";

export const checkIfMovieReleased = (movie) => {
  const isMovieOrSerie = findIfMovieOrSerie(movie);
  
  const movieOrSerieDate = isMovieOrSerie === 'movie' ? movie.release_date : movie.first_air_date;

  const today = new Date();
  const releaseDate = new Date(movieOrSerieDate);

  const isReleased = releaseDate <= today;

  if (isReleased) {
    return true;
  } else {
    return false;
  }
}