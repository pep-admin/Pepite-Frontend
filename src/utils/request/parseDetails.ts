export const parseDatabaseData = (data, requestType) => {
  // Parsez les chaînes JSON pour les genres et les pays de production
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const id = Number(data.movie_id); // Assurez-vous que c'est un nombre
  const overview = data.overview; // String
  const poster_path = data.poster_path; // String
  const release_date = data.release_date;
  const release_dates = JSON.parse(data.release_dates);
  const title = data.title; // String
  const vote_average = parseFloat(data.vote_average); // Convertir en nombre à virgule flottante
  let rating = null;
  let text = null;
  let critic_id = null;

  if (requestType === 'critic') {
    rating = data.rating;
    text = data.text;
    critic_id = Number(data.id);
  }

  return {
    genres,
    production_countries,
    id,
    overview,
    poster_path,
    release_date,
    release_dates,
    title,
    vote_average,
    rating,
    text,
    critic_id,
  };
};
