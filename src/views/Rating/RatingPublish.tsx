import { AlertColor, Button, Stack, Typography } from '@mui/material';
import { useAlert } from '@hooks/AlertContext';
import { postCriticRequest } from '@utils/request/critics/postCriticRequest';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { useSnackbar } from '@hooks/SnackbarContext';
import { modifyCriticRequest } from '@utils/request/critics/modifyCriticRequest';
import { postAdviceRequest } from '@utils/request/advices/postAdviceRequest';
import { modifyAdviceRequest } from '@utils/request/advices/modifyAdviceRequest';

const RatingPublish = ({ 
  ratingSectionIndex, 
  publicationChoice, 
  setPublicationChoice,
  isCriticOrAdvice, 
  movie, 
  isGoldNugget, 
  isTurnip, 
  movieRating, 
  criticText, 
  friendSelected,
  setMovieSelected
}) => {

  const { showAlert, showSimpleAlert } = useAlert();
  const handleOpenSnackbar = useSnackbar(); 

  const isMovieOrSerie = findIfMovieOrSerie(movie);
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;

  const friendFullname = `${friendSelected?.first_name} ${friendSelected?.last_name}`;

  const checkIfPublishValid = () => {
    // Si critique
    if(ratingSectionIndex === 0) {
      // Pas de note mais une pépite ou un navet
      if(!movieRating && (isGoldNugget || isTurnip)) {
        return true;
      } 
      // Une note et ni pépite, ni navet
      else if(movieRating !== null && !isGoldNugget && !isTurnip) {
        return true;
      } else {
        return false;
      }
    } 
    // Si conseil
    if(ratingSectionIndex === 1) {
      // Un ami a été choisi
      if(friendSelected) {
        return true;
      } else {
        return false;
      }
    }
  };

  const generateMessage = (error: boolean) => {

    if(error) {
      // Si notation et pas de note ou ni pépite, ni navet
      if(isCriticOrAdvice === 'critic' && (!isGoldNugget && !isTurnip)) {
        return 'Vous devez ajouter au moins une note pour pouvoir publier votre critique.';
      }

      // Si conseil et pas d'ami choisi
      if(isCriticOrAdvice === 'advice' && !friendSelected) {
        return `Vous devez choisir un(e) ami(e) à qui conseiller ${isMovieOrSerie === 'movie' ? 'ce film' : 'cette série'}.`;
      }
    } else {
      if(isCriticOrAdvice === 'critic') {
        return `Êtes-vous sûr de vouloir publier cette critique ${publicationChoice} ?`
      } else {
        return `Êtes-vous sûr de vouloir conseiller "${movieTitle}" à ${friendFullname}?`
      }
    }
  };

  const handlePublicationChoice = (choice) => {
    if(choice === 'publique') {
      setPublicationChoice('publique');
    } else {
      setPublicationChoice('privée');
    }
  };

  const handleConfirmation = (
    titleContent: string, 
    messageContent: string, 
    alertType: AlertColor, 
    criticAdviceId: null | number
  ) => {
    showAlert({
      title: `${titleContent}`,
      message: `${messageContent}`,
      severity: `${alertType}`,
      onConfirm: () => !criticAdviceId ? // Pas de critique déjà existante ?
        postCriticAdvice() // Publication de la critique
        : // Si critique déjà existante, on écrase l'ancienne critique
        updateCriticAdvice(criticAdviceId),
      onCancel: () => console.log('Action annulée'),
    });
  };

  const postCriticAdvice = async() => {
    try {

      if(isCriticOrAdvice === 'critic') {

        const isPrivate = publicationChoice === 'privée' ? true : false; // Critique publique ou privée

        const critic = await postCriticRequest(
          movie.id, 
          isMovieOrSerie, 
          movieRating, 
          criticText, 
          isGoldNugget, 
          isTurnip,
          isPrivate
        );
  
        // Si critique existante
        if(critic.exists) {
          // On demande la confirmation d'écraser l'ancienne
          handleConfirmation('Critique déjà existante', `${critic.message}`, 'warning', critic.id);
        } else {
          handleOpenSnackbar(`Nouvelle critique ${publicationChoice} publiée.`);
          setMovieSelected(null); 
        }

      } else {

        const advice = await postAdviceRequest(
          friendSelected.id,
          friendFullname,
          movie.id, 
          movieTitle,
          isMovieOrSerie, 
          movieRating, 
          criticText, 
          isGoldNugget, 
          isTurnip,
        );
        console.log(advice);
        
        // Si conseil existant
        if(advice.exists) {
          // On demande la confirmation d'écraser l'ancienne
          handleConfirmation('Conseil déjà existant', `${advice.message}`, 'warning', advice.id);
        } else {
          handleOpenSnackbar(`Vous avez conseillé ${movieTitle} à ${friendFullname}.`);
          setMovieSelected(null); 
        }
      }

      
    } catch (error) {
      console.log(error);
      handleOpenSnackbar('Erreur: impossible de publier la critique.');
    }
  };

  const updateCriticAdvice = async(criticAdviceId: number) => {
    try {

      if(isCriticOrAdvice === 'critic') {
        const isPrivate = publicationChoice === 'privée' ? true : false;
      
        await modifyCriticRequest(
          criticAdviceId, 
          isMovieOrSerie, 
          movieRating, 
          criticText, 
          isGoldNugget, 
          isTurnip,
          isPrivate
        );

        handleOpenSnackbar(`Nouvelle critique pour ${ isMovieOrSerie === 'movie' ? movie.title : movie.name }.`);
        setMovieSelected(null);
      } else {

        await modifyAdviceRequest(
          criticAdviceId,
          movie.id,
          friendSelected.id,
          isMovieOrSerie,
          movieRating,
          criticText,
          isGoldNugget,
          isTurnip
        );

        handleOpenSnackbar(`Nouveau conseil envoyé à ${friendFullname}.`);
        setMovieSelected(null); 
      }
      
    } catch (error) {
      handleOpenSnackbar('Erreur: impossible de modifier la critique existante.');
    }
  };

  return (
    <Stack
      spacing={6}
      padding='30px 0 40px 0'
    >
      <Stack>
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          { ratingSectionIndex === 0 ? 
            'PUBLICATION'
            : 'ENVOI DU CONSEIL'
          }
        </Typography>
        <Typography
          component='h2'
          color='gray'
          fontSize='1em'
          fontWeight='400'
          lineHeight='1'
          marginTop='4px'
        >
          { ratingSectionIndex === 0 ?
            'Publique ou privée'
            :
            'Privé'
          }
        </Typography>
      </Stack>
      <Stack 
        direction='row' 
        justifyContent={ ratingSectionIndex === 0 ? 'space-evenly' : 'center' } 
      >
        { ratingSectionIndex === 0 &&
          <Stack spacing={1} >
            <Button
              sx={{
                height: '30px',
                width: '140px',
                padding: '7px 12px 5px 12px',
                color: '#f1f1f1',
                outline: `1px solid ${publicationChoice === 'publique' ? '#E7AE1A' : '#2D2D2D'}`,
                fontSize: '0.75em',
                fontWeight: '400'
              }}
              onClick={() => handlePublicationChoice('publique')}
            >
              {'PUBLIQUE'}
            </Button>
            <Typography
              align='center'
              fontWeight='200'
              color={ publicationChoice === 'publique' ? '#E7AE1A' : '#808080' }
            >
              {'amis et followers'}
            </Typography>
          </Stack>
        }
        <Stack 
          direction='row' 
          justifyContent='space-evenly'
        >
          <Stack spacing={1} >
            <Button
              sx={{
                height: '30px',
                width: '140px',
                padding: '7px 12px 5px 12px',
                color: '#f1f1f1',
                outline: `1px solid ${publicationChoice === 'privée' ? '#E7AE1A' : '#2D2D2D'}`,
                fontSize: '0.75em',
                fontWeight: '400'
              }}
              onClick={() => handlePublicationChoice('privée')}
            >
              { ratingSectionIndex === 0 ? 
                'PRIVÉE'
                : 'PRIVÉ'
              }
            </Button>
            <Typography
              align='center'
              fontWeight='200'
              color={ publicationChoice === 'privée' ? '#E7AE1A' : '#808080' }
            >
              {'amis seulement'}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems='center' >
        <Button
          variant='contained'
          color='secondary'
          sx={{
            height: '32px',
            width: '140px',
            padding: '7px 12px 5px 12px',
            color: '#011212',
            backgroundColor: checkIfPublishValid() ? '#E7AE1A !important' : '#383838'
          }}
          onClick={() => 
            checkIfPublishValid() ?
              handleConfirmation(
                `Publication ${publicationChoice}`, 
                `${generateMessage(false)}`, 
                'info',
                null
              )
            :
              showSimpleAlert(
                'Informations manquantes',
                `${generateMessage(true)}`,
                'error',
              )
          }
        >
          { ratingSectionIndex === 0 ? 
            'PUBLIER'
            : 'CONSEILLER'
          }
        </Button>
      </Stack>
    </Stack>
  );
};

export default RatingPublish;