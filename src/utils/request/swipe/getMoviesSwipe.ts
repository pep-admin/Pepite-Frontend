import { findIsoCountry } from '@utils/functions/findInfos';
import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de 20 films pour le swipe
export const fetchTwentyMovies = async (
  moviePage: number,
  displayType: string,
  countryChosen,
  genreChosen: null | number,
) => {
  let countryString;
  let genreString;

  if (countryChosen.name !== '')
    countryString = `&with_origin_country=${findIsoCountry(countryChosen.name)}`;
  else countryString = '';

  if (genreChosen !== null) genreString = `&with_genres=${genreChosen}`;
  else genreString = '';

  const response = await axios.get(
    `${apiBaseUrl}/movies/all?page=${moviePage}&type=${displayType}${countryString}${genreString}`,
    { withCredentials: true },
  );

  return response.data.elligible;
};
