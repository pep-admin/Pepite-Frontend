// import { Movie } from "types/interface";

// Si récupération des détails des films depuis la DB, on parse les infos
export const parseDatabaseData = data => {
  console.log('les données =>', data);

  // Informations générales
  const isMovie = 'release_date' in data;
  const isSerie = 'first_air_date' in data;
  const grouped_critics = data.grouped_critics;
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const backdrop_path = data.backdrop_path;
  const tmdb_vote_average = parseFloat(data.vote_average);
  const pepite_vote_average = parseFloat(data.pepite_vote_average);

  let isMovieOrSerie: string;
  let id: number;

  if (isMovie) {
    const release_date = data.release_date;
    const title = data.title;

    isMovieOrSerie = 'movie';
    id = Number(data.movie_id);

    return {
      isMovieOrSerie,
      id,
      title,
      grouped_critics,
      genres,
      production_countries,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      tmdb_vote_average,
      pepite_vote_average,
    };
  }

  if (isSerie) {
    const release_date = data.first_air_date;
    const title = data.name;

    isMovieOrSerie = 'serie';
    id = Number(data.serie_id);

    return {
      isMovieOrSerie,
      id,
      title,
      grouped_critics,
      genres,
      production_countries,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      tmdb_vote_average,
      pepite_vote_average,
    };
  }
};
