// Si récupération des détails des films depuis la DB, on parse les infos
export const parseDatabaseData = (data, displayType, requestType) => {
  const loggedUserId = JSON.parse(localStorage.getItem('user_infos'));

  // console.log('les données à parse ==>', data);
  const isMovie = 'movie_id' in data;
  const isSerie = 'serie_id' in data;

  // Informations générales
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const overview = data.overview;
  const poster_path = data.poster_path;
  const vote_average = parseFloat(data.vote_average);
  const friends_and_followed_critics = data.friends_and_followed_critics;

  // Films
  let movie_id;
  let release_date;
  let release_dates;
  let title;
  let wanted_date = null;
  let watched_date = null;
  // let friends_and_followed_critics = null;

  // Dans le cas où on veut parser les infos pour un FILM qui n'a pas été noté par les utilisateurs
  if (isMovie && requestType !== 'critic' && requestType !== 'advice') {
    movie_id = data.movie_id;
    release_date = data.release_date; // date de sortie
    release_dates = JSON.parse(data.release_dates); // certifications (-10, -12...),
    title = data.title; // titre du film
    wanted_date = data.wanted_date;
    watched_date = data.watched_date;
    // friends_and_followed_critics = data.friends_and_followed_critics;

    return {
      genres,
      production_countries,
      movie_id,
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
  let serie_id;
  let first_air_date;
  let content_ratings;
  let name;

  // Dans le cas où on veut parser les infos pour une SERIE qui n'a pas été noté par les utilisateurs
  if (isSerie && requestType !== 'critic' && requestType !== 'advice') {
    serie_id = data.serie_id;
    first_air_date = data.first_air_date; // date du premier épisode
    content_ratings = JSON.parse(data.content_ratings); // certifications
    name = data.name; // nom de la série
    wanted_date = data.wanted_date;
    watched_date = data.watched_date;
    // friends_and_followed_critics = data.friends_and_followed_critics;

    return {
      genres,
      production_countries,
      serie_id,
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
  let type = null;
  let rating = null;
  let text = null;
  let critic_id = null;
  let advice_id = null;
  let is_gold_nugget = 0;
  let is_turnip = 0;
  let critic_date = null;
  let advice_date = null;
  let user_id = null;
  let sender_id = null;
  let relation_type = null;

  // Dans le cas où on veut parser des infos pour un FILM qui a été noté par les utilisateurs ( critiques et conseils )
  if (isMovie && (requestType === 'critic' || requestType === 'advice')) {
    movie_id = Number(data.movie_id);
    release_date = data.release_date;
    release_dates = JSON.parse(data.release_dates);
    title = data.title;
    rating = data.rating; // la note choisie par l'utilisateur
    text = data.text; // le texte de la critique
    is_gold_nugget = Number(data.is_gold_nugget);
    is_turnip = Number(data.is_turnip);
    relation_type = data.user_id === loggedUserId ? 'self' : data.relation_type;

    if (requestType === 'critic') {
      type = 'critic';
      critic_id = Number(data.id);
      critic_date = data.critic_date;
      user_id = data.user_id;

      return {
        critic_date,
        critic_id,
        friends_and_followed_critics,
        genres,
        movie_id,
        is_gold_nugget,
        is_turnip,
        overview,
        poster_path,
        production_countries,
        rating,
        relation_type,
        release_date,
        release_dates,
        text,
        title,
        type,
        user_id,
        vote_average,
      };
    } else {
      type = 'advice';
      advice_id = Number(data.id);
      advice_date = data.advice_date;
      sender_id = data.sender_id;

      return {
        advice_date,
        advice_id,
        // friends_and_followed_critics
        genres,
        movie_id,
        is_gold_nugget,
        is_turnip,
        overview,
        poster_path,
        production_countries,
        rating,
        relation_type,
        release_date,
        release_dates,
        sender_id,
        text,
        title,
        type,
        vote_average,
      };
    }
  }

  // Dans le cas où on veut parser des infos pour une SERIE qui a été noté par les utilisateurs ( critiques et conseils )
  if (isSerie && (requestType === 'critic' || requestType === 'advice')) {
    serie_id = Number(data.serie_id);
    first_air_date = data.first_air_date;
    content_ratings = JSON.parse(data.content_ratings);
    name = data.name;
    rating = data.rating;
    text = data.text;
    is_gold_nugget = Number(data.is_gold_nugget);
    is_turnip = Number(data.is_turnip);
    relation_type = data.user_id === loggedUserId ? 'self' : data.relation_type;

    if (requestType === 'critic') {
      type = 'critic';
      critic_id = Number(data.id);
      critic_date = data.critic_date;
      user_id = data.user_id;

      return {
        content_ratings,
        critic_date,
        critic_id,
        friends_and_followed_critics,
        genres,
        serie_id,
        is_gold_nugget,
        is_turnip,
        overview,
        poster_path,
        production_countries,
        rating,
        relation_type,
        first_air_date,
        text,
        name,
        type,
        user_id,
        vote_average,
      };
    } else {
      type = 'advice';
      advice_id = Number(data.id);
      advice_date = data.advice_date;
      sender_id = data.sender_id;

      return {
        advice_date,
        advice_id,
        content_ratings,
        // friends_and_followed_critics
        genres,
        serie_id,
        is_gold_nugget,
        is_turnip,
        overview,
        poster_path,
        production_countries,
        rating,
        relation_type,
        sender_id,
        text,
        name,
        type,
        vote_average,
      };
    }
  }
};
