// import { Movie } from "types/interface";

// Si récupération des détails des films depuis la DB, on parse les infos
export const parseDatabaseData = data => {
  // console.log('les données =>', data);

  // Informations générales
  const isMovie = 'release_date' in data;
  const isSerie = 'first_air_date' in data;
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const backdrop_path = data.backdrop_path;
  const tmdb_vote_average = parseFloat(data.vote_average);
  const user_rating = parseFloat(data.rating);
  const is_gold_nugget = data.is_gold_nugget === 1 ? true : false;
  const is_turnip = data.is_turnip === 1 ? true : false;
  const post_date = data.post_date;

  // Si plusieurs personnes ont noté un même film
  const grouped_critics = data.grouped_critics;
  const pepite_vote_average = data.pepite_vote_average;

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
      pepite_vote_average,
      genres,
      production_countries,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      tmdb_vote_average,
      user_rating,
      is_gold_nugget,
      is_turnip,
      post_date
    };
  }

  if (isSerie) {
    const first_air_date = data.first_air_date;
    const name = data.name;

    isMovieOrSerie = 'serie';
    id = Number(data.serie_id);

    return {
      isMovieOrSerie,
      id,
      name,
      grouped_critics,
      pepite_vote_average,
      genres,
      production_countries,
      overview,
      poster_path,
      backdrop_path,
      first_air_date,
      tmdb_vote_average,
      user_rating,
      is_gold_nugget,
      is_turnip,
      post_date
    };
  }
};
