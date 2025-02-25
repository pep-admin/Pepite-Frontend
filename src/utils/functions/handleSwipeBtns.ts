import { handleUnwantedMovieRequest } from '@utils/request/list/handleUnwantedMovieRequest';
import { getAndStoreMovieDetails } from './getAndStoreMovieDetails';
import { Movie } from 'types/interface';
import { handleWatchedMovieRequest } from '@utils/request/list/handleWatchedMovieRequest';
import { handleWantedMovieRequest } from '@utils/request/list/handleWantedMovieRequest';

export const handleSwipeBtns = async (
  choice: string,
  movie: Movie,
  isMovieOrSerie: string,
  // rating: number,
  handleOpenSnackbar: (message: string) => void,
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let wantedMovies = JSON.parse(localStorage.getItem('wantedMovies')) || [];
  let unwantedMovies = JSON.parse(localStorage.getItem('unwantedMovies')) || [];
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;

  try {
    // Avant l'action, on sauvegarde les détails du film dans la DB
    try {
      console.log('sauvegarde des détails...');
      await getAndStoreMovieDetails(isMovieOrSerie, movie.id, null);
    } catch (error) {
      console.log('erreur lors de la sauvegarde des données :', error);
      return;
    }

    // Ensuite, on ajoute l'id du film dans le tableau concerné du local storage et on fait la requête vers la DB
    switch (choice) {
      // Film non voulu
      case 'unwanted': {
        const isAlreadyUnwanted = unwantedMovies.includes(movie.id);

        unwantedMovies = !isAlreadyUnwanted
          ? [...unwantedMovies, movie.id]
          : unwantedMovies.filter(id => id !== movie.id);

        wantedMovies = wantedMovies.filter(id => id !== movie.id);
        watchedMovies = watchedMovies.filter(id => id !== movie.id);

        localStorage.setItem('unwantedMovies', JSON.stringify(unwantedMovies));

        const unwantedResponse = await handleUnwantedMovieRequest(
          movie.id,
          isMovieOrSerie,
          !isAlreadyUnwanted,
        );

        handleOpenSnackbar(`${movieTitle} ${unwantedResponse.message}`);
        break;
      }

      // Film vu
      case 'watched': {
        const isAlreadyWatched = watchedMovies.includes(movie.id);

        watchedMovies = !isAlreadyWatched
          ? [...watchedMovies, movie.id]
          : watchedMovies.filter(id => id !== movie.id);

        wantedMovies = wantedMovies.filter(id => id !== movie.id);
        unwantedMovies = unwantedMovies.filter(id => id !== movie.id);

        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));

        const watchedResponse = await handleWatchedMovieRequest(
          movie.id,
          isMovieOrSerie,
          !isAlreadyWatched,
        );

        handleOpenSnackbar(`${watchedResponse.message} ${movieTitle}.`);
        break;
      }

      // Film voulu
      case 'wanted': {
        const isAlreadyWanted = wantedMovies.includes(movie.id);

        wantedMovies = !isAlreadyWanted
          ? [...wantedMovies, movie.id]
          : wantedMovies.filter(id => id !== movie.id);

        watchedMovies = watchedMovies.filter(id => id !== movie.id);
        unwantedMovies = unwantedMovies.filter(id => id !== movie.id);

        localStorage.setItem('wantedMovies', JSON.stringify(wantedMovies));

        const wantedResponse = await handleWantedMovieRequest(
          movie.id,
          isMovieOrSerie,
          !isAlreadyWanted,
        );

        handleOpenSnackbar(`${movieTitle} ${wantedResponse.message}`);
        break;
      }

      default:
        break;
    }

    setIsActive(!isActive);
  } catch (error) {
    return 'Failed to update movie state in database';
  }
};
