import { AlertColor, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useAlert } from '@hooks/AlertContext';
import { postCriticRequest } from '@utils/request/critics/postCriticRequest';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { useSnackbar } from '@hooks/SnackbarContext';
import { modifyCriticRequest } from '@utils/request/critics/modifyCriticRequest';

const RatingPublish = ({ movie, isGoldNugget, isTurnip, movieRating, criticText }) => {

  const { showAlert } = useAlert();
  const handleOpenSnackbar = useSnackbar(); 

  const isMovieOrSerie = findIfMovieOrSerie(movie);

  const [publicationChoice, setPublicationChoice] = useState('publique');

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
    criticId: null | number
  ) => {
    showAlert({
      title: `${titleContent}`,
      message: `${messageContent}`,
      severity: `${alertType}`,
      onConfirm: () => !criticId ? postCritic() : updateCritic(criticId),
      onCancel: () => console.log('Action annulée'),
    });
  };

  const postCritic = async() => {
    try {
      const isPrivate = publicationChoice === 'private' ? true : false;

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
        console.log('la critique =>', critic);
        
      } else {
        handleOpenSnackbar(`Nouvelle critique ${publicationChoice} publiée.`);
      }
    } catch (error) {
      console.log(error);
      handleOpenSnackbar('Erreur: impossible de publier la critique.');
    }
  };

  const updateCritic = async(criticId: number) => {
    try {
      const isPrivate = publicationChoice === 'private' ? true : false;

      await modifyCriticRequest(
        criticId, 
        isMovieOrSerie, 
        movieRating, 
        criticText, 
        isGoldNugget, 
        isTurnip,
        isPrivate
      );

      handleOpenSnackbar(`Nouvelle critique pour ${ isMovieOrSerie === 'movie' ? movie.title : movie.name }.`);
    } catch (error) {
      handleOpenSnackbar('Erreur: impossible de modifier la critique existante.');
    }
  };

  return (
    <Stack
      spacing={6}
      padding='0 0 40px 0'
    >
      <Stack>
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`PUBLICATION`}
        </Typography>
        <Typography
          component='h2'
          color='gray'
          fontSize='1em'
          fontWeight='400'
          lineHeight='1'
          marginTop='4px'
        >
          {'Publique ou privée'}
        </Typography>
      </Stack>
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
              {'PRIVÉE'}
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
            backgroundColor: '#E7AE1A !important'
          }}
          onClick={() => 
            handleConfirmation(
              `Publication ${publicationChoice}`, 
              'Êtes-vous sûr de vouloir publier cette critique ?', 
              'info',
              null
            )
          }
        >
          {'PUBLIER'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default RatingPublish;