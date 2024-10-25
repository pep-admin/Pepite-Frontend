export const checkIfMovieReleased = (movie) => {
  console.log(movie);
  
  const today = new Date();
  const releaseDate = new Date(movie.release_date);

  const isReleased = releaseDate <= today;

  if (isReleased) {
    return true;
  } else {
    return false;
  }
}