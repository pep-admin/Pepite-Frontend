import axios from 'axios';

export const storeDetailsData = async (movieDetail, type) => {
  try {
    const id = movieDetail.id;
    const genres = movieDetail.genres;
    const production_countries = movieDetail.production_countries;
    const vote_average = movieDetail.vote_average;
    let additionalInfos;

    if (type === 'movie') {
      console.log('film à update', movieDetail);

      const release_dates = movieDetail.release_dates;

      additionalInfos = {
        id: id,
        genres: genres,
        production_countries: production_countries,
        release_dates: release_dates,
        vote_average: vote_average,
      };
    }

    if (type === 'tv') {
      console.log('série à update', movieDetail);

      const content_ratings = movieDetail.content_ratings;

      additionalInfos = {
        id: id,
        genres: genres,
        production_countries: production_countries,
        content_ratings: content_ratings,
        vote_average: vote_average,
      };
    }

    await axios.post(
      'http://localhost:8800/api/movies/store_details',
      { type: type, additionalInfos: additionalInfos },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('erreur dans le stockage des détails :', error);
  }
};
