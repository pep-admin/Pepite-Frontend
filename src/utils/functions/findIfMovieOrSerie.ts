export const findIfMovieOrSerie = movie => {
  const isMovieOrSerie = 'release_date' in movie ? 'movie' : 'serie';
  return isMovieOrSerie;
};
