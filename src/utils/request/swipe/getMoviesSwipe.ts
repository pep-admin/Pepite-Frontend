import { findIsoCountry } from '@utils/functions/findInfos';
import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de 20 films pour le swipe
export const fetchTwentyMovies = async (
  moviePage: number,
  swipeType: string,
  countryChosen,
  genreChosen: null | number,
  ratingChosen: null | number,
) => {
  let countryString;
  let genreString;
  let ratingString;

  if (countryChosen.name !== 'Tous') {
    countryString = `&with_origin_country=${findIsoCountry(
      countryChosen.name,
    )}`;
  } else countryString = '';

  if (genreChosen !== null) genreString = `&with_genres=${genreChosen}`;
  else genreString = '';

  if (ratingChosen) ratingString = `&vote_average=${ratingChosen * 2}`;
  else ratingString = '';

  const response = await axios.get(
    `${apiBaseUrl}/movies/all?page=${moviePage}&type=${swipeType}${countryString}${genreString}${ratingString}`,
    { withCredentials: true },
  );

  return response.data.elligible;
};
