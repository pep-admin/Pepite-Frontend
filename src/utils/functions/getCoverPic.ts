import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

// Récupération de la photo de couverture
export const getCoverPic = (
  isProfilUserLogged,
  loggedUserInfos,
  chosenUser,
) => {
  // Si profil de l'utilisateur connecté et qu'une photo de couverture a été choisie
  if (isProfilUserLogged && loggedUserInfos.coverPics.length) {
    return `${apiBaseUrl}/uploads/${
      loggedUserInfos.coverPics.find(pic => pic.isActive === 1).filePath
    }`;
  }
  // Si profil d'un autre utilisateur et qu'une photo de couverture a été choisie
  else if (!isProfilUserLogged && chosenUser?.coverPics.length) {
    return `${apiBaseUrl}/uploads/${
      chosenUser.coverPics.find(pic => pic.isActive === 1).filePath
    }`;
  }
  // Si aucune photo de couverture n'a été choisie
  else {
    return `${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg`;
  }
};
