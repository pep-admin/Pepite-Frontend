import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique
export const uploadUserPic = async (newFile, picType) => {
  const formData = new FormData();
  formData.append('profilePic', newFile); // Le fichier
  formData.append('picType', picType); // Photo de couverture ou profil

  await axios.post(`${apiBaseUrl}/users/modify/profil_pic`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};
