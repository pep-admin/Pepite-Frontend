import { findIsoCountry } from '@utils/functions/findInfos';
import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de 20 films pour le swipe
export const getMoviesSwipe = async (
  moviePage: number,
  typeChosen: string,
  countryChosen: string,
  genreChosen: null | number,
  ratingChosen: null | number,
  periodChosen: string,
) => {
  
  try {
    let countryString;
    let genreString;
    let ratingString;
    let periodString;

    if (countryChosen !== 'Tous') {
      countryString = `&with_origin_country=${findIsoCountry(
        countryChosen,
      )}`;
    } else countryString = '';

    if (genreChosen) genreString = `&with_genres=${genreChosen}`;
    else genreString = '';

    if (ratingChosen) ratingString = `&vote_average=${ratingChosen * 2}`;
    else ratingString = '';  

    switch (periodChosen) {
      case 'Toutes':
        periodString = '';
        break;
      case 'Avant 1950':
        periodString = `&primary_release_date_to=1949-12-31`;
        break;
      case '1950 à 1960':
        periodString = `&primary_release_date_from=1950-01-01&primary_release_date_to=1959-12-31`;
        break;
      case '1960 à 1970':
        periodString = `&primary_release_date_from=1960-01-01&primary_release_date_to=1969-12-31`;
        break;
      case '1970 à 1980':
        periodString = `&primary_release_date_from=1970-01-01&primary_release_date_to=1979-12-31`;
        break;
      case '1980 à 1990':
        periodString = `&primary_release_date_from=1980-01-01&primary_release_date_to=1989-12-31`;
        break;
      case '1990 à 2000':
        periodString = `&primary_release_date_from=1990-01-01&primary_release_date_to=1999-12-31`;
        break;
      case '2000 à 2010':
        periodString = `&primary_release_date_from=2000-01-01&primary_release_date_to=2009-12-31`;
        break;
      case '2010 à 2020':
        periodString = `&primary_release_date_from=2010-01-01&primary_release_date_to=2019-12-31`;
        break;
      case 'Depuis 2020':
        periodString = `&primary_release_date_from=2020-01-01`;
        break;
      default:
        periodString = '';
    }  

    const response = await axios.get(
      `${apiBaseUrl}/movies/all?page=${moviePage}&type=${typeChosen}${countryString}${genreString}${ratingString}${periodString}`,
      { withCredentials: true },
    );  

    return response.data.elligible;

  } catch (error) {
    throw error;
  }
  
};
