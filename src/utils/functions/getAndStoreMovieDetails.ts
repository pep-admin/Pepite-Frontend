import { getMovieDetailsRequest } from "@utils/request/getMovieDetailsRequest";
import { storeMovieDataRequest } from "@utils/request/store/storeMovieDataRequest";

/*
  Cette fonction permet selon l'usage :
    - Récupérer les données détaillées d'un film
    - Envoyer les données détaillées d'un film à la DB
*/

type MovieDetailsType = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  vote_average?: number;
  // ajoutez d'autres propriétés si nécessaire
};

export const getAndStoreMovieDetails = async(
  isMovieOrSerie: string,
  movieId: number,
  setMovieDetails: React.Dispatch<React.SetStateAction<MovieDetailsType | null>>
  ) => {
  // Récupération des détails du film
  const details = await getMovieDetailsRequest(isMovieOrSerie, movieId);

  if(setMovieDetails) setMovieDetails(details);

  // Enregistrement des données du film nécessaires dans la base de données 
  const necessaryDetails = {
    id: details.id,
    title: isMovieOrSerie === 'movie' ? details.title : details.name,
    overview: details.overview,
    release_date: isMovieOrSerie === 'movie' ? details.release_date : details.first_air_date,
    poster_path: details.poster_path,
    backdrop_path: details.backdrop_path,
    genres: details.genres,
    production_countries: details.production_countries,
    vote_average: details.vote_average
  }
  storeMovieDataRequest(isMovieOrSerie, necessaryDetails);

  console.log('les détails du film =>', necessaryDetails);
}