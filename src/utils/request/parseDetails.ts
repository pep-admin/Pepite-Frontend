export const parseDatabaseData = (data, displayType, requestType) => {
  // Si récupération des détails des films depuis la DB, on parse les infos
  // Films + séries
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const id = Number(data.movie_id);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const vote_average = parseFloat(data.vote_average);

  // Films
  let release_date;
  let release_dates;
  let title;

  // Séries
  let first_air_date;
  let content_ratings;
  let name;

  if (displayType === 'movie') {
    release_date = data.release_date;
    release_dates = JSON.parse(data.release_dates);
    title = data.title;
  }

  if (displayType === 'tv') {
    first_air_date = data.first_air_date;
    content_ratings = JSON.parse(data.content_ratings);
    name = data.name;
  }

  let rating = null;
  let text = null;
  let critic_id = null;
  let is_gold_nugget = 0;

  // Dans le cas où on doit parser des infos pour afficher les critiques
  if (requestType === 'critic') {
    rating = data.rating;
    text = data.text;
    critic_id = Number(data.id);
    is_gold_nugget = Number(data.is_gold_nugget);
  }

  return {
    genres,
    production_countries,
    id,
    overview,
    poster_path,
    release_date,
    release_dates,
    first_air_date,
    title,
    content_ratings,
    name,
    vote_average,
    rating,
    text,
    critic_id,
    is_gold_nugget,
  };
};
