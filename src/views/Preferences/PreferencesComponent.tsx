import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { shortGenresMovieList } from '@utils/data/shortGenres';
import AuthHeader2 from '@views/Auth/AuthHeader2';
import PreferencesCard from './PreferencesCard';
import { useState } from 'react';
import CustomAlert from '@utils/components/Infos/CustomAlert';
import { updateFavoriteGenres } from '@utils/request/users/updateFavoriteGenres';
import { useNavigate } from 'react-router-dom';

const PreferencesComponent = () => {
  const navigate = useNavigate();

  const loggedUserId = JSON.parse(localStorage.getItem('user_infos')).id;

  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [showAlert, setShowAlert] = useState({
    display: false,
    error: false,
    severity: '',
    message: '',
  });

  const submitGenres = async () => {
    if (favoriteGenres.length < 3 || favoriteGenres.length > 6) {
      setShowAlert({
        display: true,
        error: false,
        severity: 'info',
        message: 'Vous devez choisir entre 3 et 6 genres préférés.',
      });
    } else {
      console.log('update genres =>', favoriteGenres);
      try {
        await updateFavoriteGenres(favoriteGenres);
        navigate(`/home/${loggedUserId}`);
      } catch (error) {
        setShowAlert({
          display: true,
          error: true,
          severity: 'error',
          message:
            'Erreur serveur : impossible de mettre à jour les genres préférés.',
        });
      }
    }
  };

  return (
    <Container sx={{ padding: '10px 5vw' }}>
      <AuthHeader2 backgroundMovieTitle={null} />
      <Stack spacing={1} marginTop="25px">
        <Typography fontSize="1.25em" fontWeight="800" color="#E7E7E7">
          {'Préférences'}
        </Typography>
        <Typography
          align="left"
          fontWeight="400"
          fontSize="1em"
          color="#E7E7E7"
          lineHeight="1.7"
        >
          {'Choisissez entre 3 et 6 genres que vous aimez regarder.'}
        </Typography>
        <Divider sx={{ borderColor: '#363636', margin: '25px 0 !important' }} />
      </Stack>
      <Grid container spacing={2}>
        {shortGenresMovieList.map(genre => {
          return (
            <PreferencesCard
              key={genre.id}
              genre={genre}
              favoriteGenres={favoriteGenres}
              setFavoriteGenres={setFavoriteGenres}
            />
          );
        })}
      </Grid>
      <Stack
        alignItems="center"
        justifyContent="center"
        margin="25px 0 15px 0"
        padding="0 5vw"
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            background:
              favoriteGenres.length < 3 || favoriteGenres.length > 6
                ? 'rgb(56 56 56 / 60%)'
                : 'linear-gradient(45deg, rgba(177, 145, 16, 1) 0%, rgba(194, 172, 99, 1) 100%)',
            color: '#ffffff',
            lineHeight: 'normal',
            padding: '2px 0 0 0',
          }}
          onClick={submitGenres}
        >
          {'Valider'}
        </Button>
      </Stack>
      {showAlert.display && (
        <CustomAlert
          alertType={showAlert.severity}
          message={showAlert.message}
          setShowAlert={setShowAlert}
        />
      )}
    </Container>
  );
};

export default PreferencesComponent;
