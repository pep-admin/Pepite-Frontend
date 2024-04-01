// Import des libs externes
import { Button, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import SearchBar from '@utils/components/SearchBar';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

const ProfilInputChoice = ({
  page,
  isProfilUserLogged,
  loggedUserInfos,
  chosenUser,
  setChosenUser,
  criticsAndAdvices,
  setCriticsAndAdvices,
  setGoldenMovies,
  openSnackbar,
}) => {
  const { chosenMovie, setChosenMovie } = useData();

  const [inputChoice, setInputChoice] = useState('critic'); // Critique publique, notation privée, conseil à un ami

  const handleChangeInputChoice = () => {
    setInputChoice(currentChoice => {
      switch (currentChoice) {
        case 'critic':
          return 'quick-rating';
        case 'quick-rating':
          return 'advice';
        case 'advice':
        default:
          return 'critic';
      }
    });
  };

  useEffect(() => {
    console.log(inputChoice);
  }, [inputChoice]);

  return (
    <>
      <Stack padding="0 4%" marginTop="80px">
        <Stack direction="row" spacing={2}>
          <Typography
            component="h4"
            variant="body1"
            fontWeight="600"
            color="#383838"
          >
            {(page === 'profil' && !isProfilUserLogged) ||
            inputChoice === 'advice'
              ? 'Conseillez à un ami'
              : inputChoice === 'critic'
              ? 'Publiez une critique publique'
              : 'Notez de manière privée'}
          </Typography>
          {(page === 'profil' && isProfilUserLogged) || page === 'home' ? (
            <Button
              variant="contained"
              disableElevation
              sx={{
                height: '21px',
                width: '21.5px',
                minWidth: 'auto',
                padding: '0',
                fontSize: '0.9em',
                bgcolor: '#24A5A5',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#24A5A5',
                  color: '#fff',
                },
              }}
              onClick={handleChangeInputChoice}
            >
              <SwitchLeftIcon fontSize="small" />
            </Button>
          ) : null}
        </Stack>
        <SearchBar
          page={page}
          loggedUserInfos={loggedUserInfos}
          chosenUser={chosenUser}
        />
      </Stack>
      <Modal
        open={chosenMovie !== null}
        onClose={() => setChosenMovie(null)}
        aria-labelledby={
          isProfilUserLogged ? 'Nouvelle critique' : 'Nouveau conseil'
        }
        aria-describedby="modal-modal-description"
      >
        <Stack height="100vh" padding="0 6px" justifyContent="center">
          <CriticAdvicesComponent
            page={page}
            criticIndex={null}
            type={
              !isProfilUserLogged || inputChoice === 'advice'
                ? 'new-advice'
                : inputChoice === 'critic'
                ? 'new-critic'
                : 'new-quick-rating'
            }
            chosenMovie={chosenMovie}
            data={criticsAndAdvices}
            setData={setCriticsAndAdvices}
            setGoldenMovies={setGoldenMovies}
            loggedUserInfos={loggedUserInfos}
            chosenUser={chosenUser}
            setChosenUser={setChosenUser}
            infos={null}
            haveMoreCritics={null}
            isLast={null}
            inputChoice={inputChoice}
            openSnackbar={openSnackbar}
          />
        </Stack>
      </Modal>
    </>
  );
};

ProfilInputChoice.propTypes = {
  page: PropTypes.string.isRequired,
  isProfilUserLogged: PropTypes.bool.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  setChosenUser: PropTypes.func.isRequired,
  criticsAndAdvices: PropTypes.array.isRequired,
  setCriticsAndAdvices: PropTypes.func.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default ProfilInputChoice;
