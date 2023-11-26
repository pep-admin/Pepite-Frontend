// Si récupération des détails des films depuis la DB, on parse les infos
export const parseDatabaseData = (data, displayType, requestType) => {
  // Informations générales
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const vote_average = parseFloat(data.vote_average);
  let id;

  if (displayType === 'movie') {
    id = Number(data.movie_id);
  } else if (displayType === 'tv') {
    id = Number(data.serie_id);
  }

  // Films
  let release_date;
  let release_dates;
  let title;

  // Dans le cas où on veut parser les infos pour un FILM qui n'est pas une critique
  if (displayType === 'movie' && requestType !== 'critic') {
    release_date = data.release_date; // date de sortie
    release_dates = JSON.parse(data.release_dates); // certifications (-10, -12...),
    title = data.title; // titre du film

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
    };
  }

  // Séries
  let first_air_date;
  let content_ratings;
  let name;

  // Dans le cas où on veut parser les infos pour une SERIE qui n'est pas une critique
  if (displayType === 'tv' && requestType !== 'critic') {
    first_air_date = data.first_air_date; // date du premier épisode
    content_ratings = JSON.parse(data.content_ratings); // certifications
    name = data.name; // nom de la série

    return {
      genres,
      production_countries,
      id,
      overview,
      poster_path,
      first_air_date,
      content_ratings,
      name,
      vote_average,
    };
  }

  // Critique
  let rating = null;
  let text = null;
  let critic_id = null;
  let is_gold_nugget = 0;

  // Dans le cas où on veut parser des infos pour une critique de FILM
  if (displayType === 'movie' && requestType === 'critic') {
    release_date = data.release_date;
    release_dates = JSON.parse(data.release_dates);
    title = data.title;
    rating = data.rating; // la note choisie par l'utilisateur
    text = data.text; // le texte de la critique
    critic_id = Number(data.id);
    is_gold_nugget = Number(data.is_gold_nugget);

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
      is_gold_nugget,
    };
  }

  // Dans le cas où on veut parser des infos pour une critique de SERIE
  if (displayType === 'tv' && requestType === 'critic') {
    first_air_date = data.first_air_date;
    content_ratings = JSON.parse(data.content_ratings);
    name = data.name;
    rating = data.rating;
    text = data.text;
    critic_id = Number(data.id);
    is_gold_nugget = Number(data.is_gold_nugget);

    return {
      genres,
      production_countries,
      id,
      overview,
      poster_path,
      first_air_date,
      content_ratings,
      name,
      vote_average,
      rating,
      text,
      critic_id,
      is_gold_nugget,
    };
  }
};
