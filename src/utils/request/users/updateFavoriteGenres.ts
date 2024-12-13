import axios from 'axios';
import { apiBaseUrl } from '../config';

export const updateFavoriteGenres = async (favoriteGenres) => {
  await axios.put(`${apiBaseUrl}/users/update/genres`,
    {favoriteGenres: favoriteGenres},
    {withCredentials: true},
  );
};
