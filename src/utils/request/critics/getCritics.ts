import axios from 'axios';

// Récupération de toutes les critiques d'un utilisateur
export const getAllCriticsOfUser = async userId => {
  const response = await axios.get(
    `http://localhost:8800/api/critics/all/${userId}`,
    { withCredentials: true },
  );
  return response.data;
};
