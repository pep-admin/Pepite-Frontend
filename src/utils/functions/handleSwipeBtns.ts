import { handleUnwantedMovieRequest } from "@utils/request/list/handleUnwantedMovieRequest";
import { getAndStoreMovieDetails } from "./getAndStoreMovieDetails";
import { Movie } from "types/interface";
import { handleWatchedMovieRequest } from "@utils/request/list/handleWatchedMovieRequest";
import { handleWantedMovieRequest } from "@utils/request/list/handleWantedMovieRequest";

export const handleSwipeBtns = async(
  choice: string, 
  movie: Movie, 
  isMovieOrSerie: string, 
  rating: number, 
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
      case 'unwanted':
        const isAlreadyUnwanted = unwantedMovies.includes(movie.id);
        
        unwantedMovies = !isAlreadyUnwanted // Si le film n'est pas dans le tableau des "non voulus"
          ? [...unwantedMovies, movie.id] // On ajoute le movieId au tableau
          : unwantedMovies.filter(id => id !== movie.id); // Sinon on le retire

        wantedMovies = wantedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "voulu"
        watchedMovies = watchedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "vu"

        localStorage.setItem('unwantedMovies', JSON.stringify(unwantedMovies)); // Attribution du nouveau tableau dans le local storage

        const unwantedResponse = await handleUnwantedMovieRequest( // Requête unwanted ou annulation
          movie.id,
          isMovieOrSerie,
          !isAlreadyUnwanted,
        );

        handleOpenSnackbar(`${movieTitle} ${unwantedResponse.message}`);
        break;

      // Film vu 
      case 'watched':
        const isAlreadyWatched = watchedMovies.includes(movie.id);
        
        watchedMovies = !isAlreadyWatched // Si le film n'est pas dans le tableau des "vus"
          ? [...watchedMovies, movie.id] // On ajoute le movieId au tableau
          : watchedMovies.filter(id => id !== movie.id); // Sinon on le retire

        wantedMovies = wantedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "voulu"
        unwantedMovies = unwantedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "non voulus"

        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies)); // Attribution du nouveau tableau dans le local storage

        const watchedResponse = await handleWatchedMovieRequest( // Requête watched ou annulation
          movie.id,
          isMovieOrSerie,
          !isAlreadyWatched,
        );

        handleOpenSnackbar(`${watchedResponse.message} ${movieTitle}.`);
        break;
        
      // Film voulu 
      case 'wanted':
        const isAlreadyWanted = wantedMovies.includes(movie.id);
        
        wantedMovies = !isAlreadyWanted // Si le film n'est pas dans le tableau des "voulus"
          ? [...wantedMovies, movie.id] // On ajoute le movieId au tableau
          : wantedMovies.filter(id => id !== movie.id); // Sinon on le retire

        watchedMovies = watchedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "vus"
        unwantedMovies = unwantedMovies.filter(id => id !== movie.id); // On retire l'id du tableau "non voulus"

        localStorage.setItem('wantedMovies', JSON.stringify(wantedMovies)); // Attribution du nouveau tableau dans le local storage

        const wantedResponse = await handleWantedMovieRequest( // Requête wanted ou annulation
          movie.id,
          isMovieOrSerie,
          !isAlreadyWanted,
        );

        handleOpenSnackbar(`${movieTitle} ${wantedResponse.message}`);
        break;
        
      // case 'rated':
      //   const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || {};
      //   ratedMovies[movie.id] = rating;
      //   localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));
        
      //   // await axios.post('/api/movies/rated', { movieId, rating });
      //   break;
        
      default:
        break;
    }

    setIsActive(!isActive);
  } catch (error) {
    return "Failed to update movie state in database";
  }
};
