import axios from 'axios';

export const storeDetailsData = async movieDetail => {
  try {
    const id = movieDetail.id;
    const genres = movieDetail.genres;
    const production_countries = movieDetail.production_countries;
    const release_date = movieDetail.release_date;
    const release_dates = movieDetail.release_dates;
    const vote_average = movieDetail.vote_average;

    const additionalInfos = {
      id: id,
      genres: genres,
      production_countries: production_countries,
      release_date: release_date,
      release_dates: release_dates,
      vote_average: vote_average,
    };

    await axios.post(
      'http://localhost:8800/api/movies/store_details',
      additionalInfos,
      { withCredentials: true },
    );
  } catch (error) {
    console.log('erreur dans le stockage des détails :', error);
  }
};
