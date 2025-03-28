import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

// Récupération de la photo de couverture
export const getCoverPic = userInfos => {
  // Si profil de l'utilisateur connecté et qu'une photo de couverture a été choisie
  if (userInfos && userInfos.coverPics.length) {
    return `${apiBaseUrl}/uploads/${
      userInfos.coverPics.find(pic => pic.isActive === 1).filePath
    }`;
  }
  // Si aucune photo de couverture n'a été choisie
  else {
    return `${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg`;
  }
};
