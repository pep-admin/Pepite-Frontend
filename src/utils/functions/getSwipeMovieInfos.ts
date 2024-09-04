// Import des noms des genres raccourcis
import {
  shortGenresMovieList,
  shortGenresSerieList,
} from '@utils/data/shortGenres';

// Fonction pour obtenir les genres raccourcis du film
export const getShortGenres = movie => {
  let shortGenres = [];

  if (movie.genre_ids.length) {
    if ('release_date' in movie) {
      shortGenres = shortGenresMovieList;
    } else {
      shortGenres = shortGenresSerieList;
    }

    // Utilisation de map pour transformer genre_ids en noms de genres
    const genreNames = movie.genre_ids
      .map(genre => {
        const genreObj = shortGenres.find(sg => sg.id === genre);
        return genreObj ? genreObj.name : null;
      })
      .filter(Boolean) // Retire les genres non trouvés (null)
      .join(', '); // Convertir le tableau de noms en une chaîne de caractères

    return genreNames || 'Non spécifié';
  } else {
    return 'Non spécifié';
  }
};

// Fonction pour extraire l'année à partir d'une date
export const getYear = movie => {
  let date = null;

  if ('release_date' in movie) {
    date = movie.release_date;
  } else if ('first_air_date' in movie) {
    date = movie.first_air_date;
  } else {
    return 'Non spécifié';
  }

  return date ? date.split('-')[0] : 'Non spécifié';
};
