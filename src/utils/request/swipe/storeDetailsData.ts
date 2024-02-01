import axios from 'axios';
import apiBaseUrl from '../config';

export const storeDetailsData = async (movieDetail, type) => {
  try {
    console.log('les détails', movieDetail);

    const id = movieDetail.current.id;
    const genres = movieDetail.current.genres;
    const production_countries = movieDetail.current.production_countries;
    const vote_average = movieDetail.current.vote_average;
    let additionalInfos;

    if (type === 'movie') {
      // console.log('film à update', movieDetail.current);

      const release_dates = movieDetail.current.release_dates;

      additionalInfos = {
        id: id,
        genres: genres,
        production_countries: production_countries,
        release_dates: release_dates,
        vote_average: vote_average,
      };
    }

    if (type === 'tv') {
      console.log('série à update', movieDetail.current);

      const content_ratings = movieDetail.current.content_ratings;

      additionalInfos = {
        id: id,
        genres: genres,
        production_countries: production_countries,
        content_ratings: content_ratings,
        vote_average: vote_average,
      };
    }

    await axios.post(
      `${apiBaseUrl}/movies/store_details`,
      { type: type, additionalInfos: additionalInfos },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('erreur dans le stockage des détails :', error);
  }
};
