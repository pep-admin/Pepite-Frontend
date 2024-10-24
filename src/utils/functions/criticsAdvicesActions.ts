import { getAdvicesReceived } from '@utils/request/advices/getAdvicesReceived';
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';
import { getCriticsOfUser } from '@utils/request/critics/getCritics';
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getGoldNuggetsOfUserRequest';
import { getUser } from '@utils/request/users/getUserRequest';

// PAGE DE PROFIL : Récupère les critiques et conseils
export const getCriticsAdvices = async (
  page,
  id,
  displayType,
  setCritics,
  reset,
) => {
  try {
    let hasMoreCritics = true;
    let hasMoreAdvices = true;

    const criticsData = await getCriticsOfUser(id, displayType, page, 5);
    if (criticsData.length < 5) {
      console.log('plus de critiques à récupérer');

      // Si les critiques reçues sont inférieures à 5
      hasMoreCritics = false;
    }

    const advicesData = await getAdvicesReceived(id, displayType, page, 5);
    if (advicesData.length < 5) {
      // Si les conseils reçus sont inférieurs à 5
      hasMoreAdvices = false;
    }

    const combinedData = [...criticsData, ...advicesData];

    // Tri des données combinées du plus récent au plus ancien
    const sortedCombinedData = combinedData.sort((a, b) => {
      const dateA = a.critic_date || a.advice_date;
      const dateB = b.critic_date || b.advice_date;
      return new Date(dateB).getTime() - new Date(dateA).getTime(); // Tri décroissant
    });

    // Ajout d'une clé de vérification de chargement des données utilisateur
    const dataWithLoading = sortedCombinedData.map(item => ({
      ...item,
      isLoadingUser: true,
    }));

    let userInfos;

    // Récupération des informations utilisateurs
    const dataWithUserInfos = await Promise.all(
      dataWithLoading.map(async data => {
        if ('user_id' in data) {
          userInfos = await getUser(data.user_id);
        } else if ('sender_id' in data) {
          userInfos = await getUser(data.sender_id);
        }

        // Retourne les critiques, les informations de chaque utilisateur, indique que le chargement est terminé
        return { ...data, criticUserInfos: userInfos, isLoadingUser: false };
      }),
    );

    if (reset) {
      setCritics(dataWithUserInfos);
    } else {
      setCritics(prevData => [...prevData, ...dataWithUserInfos]);
    }

    // Retourne true s'il reste des critiques ou des conseils à charger
    return hasMoreCritics || hasMoreAdvices;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

// PAGE HOME : Récupère les critiques de l'utilisateur, des amis et suivis
export const getCriticsAndUserInfos = async (
  page,
  id,
  displayType,
  setCritics,
  reset,
) => {
  // Récupération des critiques
  let critics = await getAllCriticsOfAcquaintances(page, id, displayType);
  console.log('les critics', critics);

  // Ajout de la clé isLoadingUser: true pour afficher le skeleton
  critics = critics.map(critic => ({ ...critic, isLoadingUser: true }));

  // Récupération des informations utilisateurs
  const criticsWithUserInfos = await Promise.all(
    critics.map(async critic => {
      const userInfos = await getUser(critic.user_id);

      // Retourne les critiques, les informations de chaque utilisateur, indique que le chargement est terminé
      return { ...critic, criticUserInfos: userInfos, isLoadingUser: false };
    }),
  );

  if (reset) {
    setCritics(criticsWithUserInfos);
  } else {
    setCritics(existingCritics => [
      ...existingCritics,
      ...criticsWithUserInfos,
    ]);
  }

  return critics.length >= 5;
};

// Fonction pour effectuer les mises à jour après la modification
export const performUpdatePostProcessing = async (
  page,
  type,
  id,
  isProfilUserLogged,
  displayType,
  action,
  openSnackbar,
  setCritics,
  cardsToShow,
  setGoldenMovies,
  setIsModify,
  setChosenMovie,
  setChosenMovieId,
) => {
  let message = '';

  switch (action) {
    case 'submit':
      message =
        type === 'critic'
          ? 'Critique publiée avec succès !'
          : type === 'advice'
          ? 'Conseil publié avec succès !'
          : 'Notation privée ajouté à votre liste';
      break;
    case 'update':
      message =
        type === 'critic'
          ? 'Critique modifiée avec succès !'
          : 'Conseil modifié avec succès !';
      break;
    case 'delete':
      message =
        type === 'critic' || type === 'old-critic'
          ? 'Critique supprimée avec succès !'
          : 'Conseil supprimé avec succès !';
      break;
    default:
      break;
  }

  openSnackbar(message);

  if (type === 'quick-rating') return;

  if (page === 'home') {
    await getCriticsAndUserInfos(page, id, displayType, setCritics, true);
  } else {
    await getCriticsAdvices(page, id, displayType, setCritics, true);
  }

  if (
    page === 'profil' &&
    isProfilUserLogged &&
    (type === 'critic' || type === 'old-critic')
  ) {
    const response = await getAllGoldNuggetsOfUser(
      displayType,
      id,
      cardsToShow,
      1,
    );
    console.log('les pépites', response.data.goldenMovies);
    console.log('la page', page);

    setGoldenMovies(response.data.goldenMovies);
  }

  setIsModify(false);

  setChosenMovieId(null);
  setChosenMovie(null);
};

// // ****** Ajouter une nouvelle critique / conseil ****** //
// export const submitNewReview = async type => {
//   try {
//     console.log('submit', type);

//     let alertMessage = '';
//     let entityExists = { exists: false, id: null };
//     const userId = localStorage.getItem('user_id');

//     if (type === 'critic') {
//       entityExists = await checkIfCriticExistsRequest(
//         chosenMovie.id,
//         displayType,
//       );
//       alertMessage = `Vous avez déjà publié une critique pour ${
//         displayType === 'movie' ? 'le film' : 'la série'
//       } "${chosenMovie.title}". Confirmer malgré tout ?`;
//     } else if (type === 'advice') {
//       entityExists = await checkIfAdviceExistsRequest(
//         chosenMovie.id,
//         displayType,
//       );
//       alertMessage = `Vous avez déjà conseillé ${
//         displayType === 'movie' ? 'le film' : 'la série'
//       } "${chosenMovie.title}" à ${chosenUser.first_name} ${
//         chosenUser.last_name
//       }. Confirmer malgré tout ?`;
//     }

//     // Si une critique ou un conseil existe déjà, affiche une alerte
//     if (entityExists.exists) {
//       setAlertSeverity({
//         state: 'warning',
//         message: alertMessage,
//         content: entityExists.id,
//       });
//       return;
//     }

//     if (type === 'critic') {
//       await addNewCritic(
//         chosenMovie.id,
//         displayType,
//         newRating,
//         newCriticText,
//         isGoldNugget,
//         isTurnip,
//       );
//     } else if (type === 'advice') {
//       await addNewAdvice(
//         chosenUser.id,
//         chosenMovie.id,
//         displayType,
//         newRating,
//         newCriticText,
//         isGoldNugget,
//       );
//     } else if (type === 'quick-rating') {
//       console.log('quick');

//       await addNewQuickRating(
//         chosenMovie.id,
//         displayType,
//         newRating,
//         isGoldNugget,
//         isTurnip,
//       );
//     }

//     // Appelle la fonction de post-traitement pour gérer les opérations communes après l'ajout
//     await performUpdatePostProcessing(type, userId, displayType, true);
//   } catch (error) {
//     setAlertSeverity({
//       state: 'error',
//       message: error.response.data,
//       content: null,
//     });
//   }
// };

// // Modifier une critique / un conseil
// export const updateReview = async (overwrite, type) => {
//   try {
//     const userId = localStorage.getItem('user_id');
//     const entityId = overwrite ? alertSeverity.content : infos[`${type}_id`];

//     if (type === 'critic') {
//       await modifyCritic(
//         entityId,
//         displayType,
//         newRating,
//         newCriticText,
//         isGoldNugget,
//         isTurnip,
//       );
//     } else if (type === 'advice') {
//       await modifyAdvice(
//         entityId,
//         displayType,
//         newRating,
//         newCriticText,
//         isGoldNugget,
//         isTurnip,
//       );
//     }

//     await performUpdatePostProcessing(type, userId, displayType, false);
//   } catch (error) {
//     setAlertSeverity({ state: 'error', message: error, content: null });
//   }
// };
