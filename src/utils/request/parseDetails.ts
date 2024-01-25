// Si récupération des détails des films depuis la DB, on parse les infos
export const parseDatabaseData = (data, displayType, requestType) => {
  // Informations générales
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const vote_average = parseFloat(data.vote_average);
  const friends_and_followed_critics = data.friends_and_followed_critics;

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
  let wanted_date = null;
  let watched_date = null;
  // let friends_and_followed_critics = null;

  // Dans le cas où on veut parser les infos pour un FILM qui n'a pas été noté par les utilisateurs
  if (
    displayType === 'movie' &&
    requestType !== 'critic' &&
    requestType !== 'advice'
  ) {
    release_date = data.release_date; // date de sortie
    release_dates = JSON.parse(data.release_dates); // certifications (-10, -12...),
    title = data.title; // titre du film
    wanted_date = data.wanted_date;
    watched_date = data.watched_date;
    // friends_and_followed_critics = data.friends_and_followed_critics;

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
      wanted_date,
      watched_date,
      friends_and_followed_critics,
    };
  }

  // Séries
  let first_air_date;
  let content_ratings;
  let name;

  // Dans le cas où on veut parser les infos pour une SERIE qui n'a pas été noté par les utilisateurs
  if (
    displayType === 'tv' &&
    requestType !== 'critic' &&
    requestType !== 'advice'
  ) {
    first_air_date = data.first_air_date; // date du premier épisode
    content_ratings = JSON.parse(data.content_ratings); // certifications
    name = data.name; // nom de la série
    wanted_date = data.wanted_date;
    watched_date = data.watched_date;
    // friends_and_followed_critics = data.friends_and_followed_critics;

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
      wanted_date,
      watched_date,
      friends_and_followed_critics,
    };
  }

  // Critique && conseils
  let rating = null;
  let text = null;
  let critic_id = null;
  let advice_id = null;
  let is_gold_nugget = 0;
  let is_turnip = 0;
  let created_at = null;
  let sender_id = null;
  let relation_type = null;

  // Dans le cas où on veut parser des infos pour un FILM qui a été noté par les utilisateurs ( critiques et conseils )
  if (
    displayType === 'movie' &&
    (requestType === 'critic' || requestType === 'advice')
  ) {
    release_date = data.release_date;
    release_dates = JSON.parse(data.release_dates);
    title = data.title;
    rating = data.rating; // la note choisie par l'utilisateur
    text = data.text; // le texte de la critique
    // critic_id = Number(data.id);
    is_gold_nugget = Number(data.is_gold_nugget);
    is_turnip = Number(data.is_turnip);
    relation_type = data.relation_type;

    if (requestType === 'critic') {
      critic_id = Number(data.id);
      created_at = data.critic_date;
      sender_id = data.user_id;
    } else {
      advice_id = Number(data.id);
      created_at = data.advice_date;
      sender_id = data.sender_id;
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
      advice_id,
      is_gold_nugget,
      is_turnip,
      created_at,
      sender_id,
      relation_type,
      friends_and_followed_critics,
    };
  }

  // Dans le cas où on veut parser des infos pour une SERIE qui a été noté par les utilisateurs ( critiques et conseils )
  if (
    displayType === 'tv' &&
    (requestType === 'critic' || requestType === 'advice')
  ) {
    first_air_date = data.first_air_date;
    content_ratings = JSON.parse(data.content_ratings);
    name = data.name;
    rating = data.rating;
    text = data.text;
    // critic_id = Number(data.id);
    is_gold_nugget = Number(data.is_gold_nugget);
    is_turnip = Number(data.is_turnip);
    relation_type = data.relation_type;

    if (requestType === 'critic') {
      critic_id = Number(data.id);
      created_at = data.critic_date;
      sender_id = data.user_id;
    } else {
      advice_id = Number(data.id);
      created_at = data.advice_date;
      sender_id = data.sender_id;
    }

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
      advice_id,
      is_gold_nugget,
      is_turnip,
      created_at,
      sender_id,
      relation_type,
      friends_and_followed_critics,
    };
  }
};
