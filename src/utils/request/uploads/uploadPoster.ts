import axios from 'axios';
import { apiBaseUrl } from '../config';

// Envoie le chemin d'une affiche de film / série pour sauvegarde dans les fichiers et la DB
export const uploadPoster = async (posterPath: string, picType: string) => {
  await axios.post(
    `${apiBaseUrl}/users/upload/poster`,
    { posterPath: posterPath, picType: picType },
    { withCredentials: true },
  );
};
