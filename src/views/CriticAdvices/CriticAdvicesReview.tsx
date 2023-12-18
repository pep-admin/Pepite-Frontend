// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// Import des icônes
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// Import des composants internes
import CriticAdvicesReviewModal from './CriticAdvicesReviewModal';

// Import des variables d'environnements
import apiBaseUrl from '@utils/request/config';

const CriticAdvicesReview = ({
  type,
  newCriticText,
  setNewCriticText,
  criticInfos,
  isModify,
  newRating,
  chosenUser,
}) => {
  const { id } = useParams();

  const userInfos = JSON.parse(localStorage.getItem('user_infos'));

  const [showReviewModal, setShowReviewModal] = useState(false); // Booleen pour l'affichage de la modale de texte

  useEffect(() => {
    if (isModify) {
      setNewCriticText(criticInfos.text);
    } else {
      setNewCriticText('');
    }
  }, [isModify]);

  function customTextArea(size) {
    return (
      <FormControl
        variant="outlined"
        fullWidth
        sx={{ height: '100%', flexGrow: '1' }}
      >
        <InputLabel
          htmlFor="custom-outlined-input"
          sx={{ fontStyle: 'italic', overflow: 'visible' }}
        >
          {'Votre critique'}
        </InputLabel>
        <OutlinedInput
          id="custom-outlined-input"
          label={'Votre critique'}
          placeholder={'Vous pouvez rédiger une nouvelle critique'}
          value={newCriticText}
          multiline
          minRows={'4'}
          sx={{
            height: size === 'small' ? '70px' : 'auto',
            borderRadius: '0',
            fontSize: '1em',
            fontStyle: 'italic',
            flexGrow: '1',
            padding: '7.5px 14px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: size === 'small' ? '10px 0 0 10px' : '0',
              borderColor: '#8e8e8e6e',
            },
          }}
          inputProps={{
            sx: {
              height: '100% !important',
              padding: '0',
              borderRadius: '10px 0 0 10px',
            },
          }}
          onChange={e => setNewCriticText(e.target.value)}
        />
        {size === 'big' ? (
          <Button
            variant="contained"
            sx={{
              width: '140px',
              height: '35px',
              padding: '0',
              alignSelf: 'center',
              marginTop: '14px',
            }}
            onClick={() => setShowReviewModal(false)}
          >
            {'Valider le texte'}
          </Button>
        ) : null}
      </FormControl>
    );
  }

  if (type === 'old-critic' && criticInfos.text === '' && !isModify) return;

  return (
    <>
      {showReviewModal ? (
        <CriticAdvicesReviewModal
          showReviewModal={showReviewModal}
          setShowReviewModal={setShowReviewModal}
          criticInfos={criticInfos}
          type={type}
          isModify={isModify}
          customTextarea={customTextArea}
          newRating={newRating}
          chosenUser={chosenUser}
        />
      ) : null}
      <Stack
        direction="row-reverse"
        position="relative"
        borderRadius="10px"
        flexGrow="1"
        marginBottom={type === 'new-critic' || isModify ? '7px' : '0'}
        sx={{
          backgroundColor: '#F1F1F1',
        }}
        onClick={type === 'old-critic' ? () => setShowReviewModal(true) : null}
      >
        <Box
          position="absolute"
          right="47.5px"
          top="-11.5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="10"
          sx={{
            backgroundColor: '#e3e3e3',
          }}
          onClick={() => setShowReviewModal(true)}
        >
          <FullscreenIcon />
        </Box>
        <Avatar
          variant="square"
          alt={
            userInfos.id === parseInt(id, 10)
              ? `Photo de profil de ${userInfos.first_name}`
              : `Photo de profil de ${chosenUser.first_name}`
          }
          src={
            // Si profil de l'utilisateur connecté et qu'il a défini une photo de profil
            userInfos.id === parseInt(id, 10) && userInfos.profilPics.length
              ? `${apiBaseUrl}/uploads/${
                  userInfos.profilPics.find(pic => pic.isActive === 1).filePath
                }`
              : // Si profil d'un autre utilisateur et qu'il a défini une photo de profil
              userInfos.id !== parseInt(id, 10) && chosenUser?.profilPics.length
              ? `${apiBaseUrl}/uploads/${chosenUser.profilPics[0].filePath}`
              : // Si l'utilisateur n'a pas défini de photo de profil
                'http://127.0.0.1:5173/images/default_profil_pic.png'
          }
          sx={{
            width: 60,
            height: 70,
            filter: 'grayscale(1)',
          }}
        />
        <Box
          height={type === 'new-critic' || isModify ? '100%' : '70px'}
          padding={type === 'new-critic' || isModify ? '0' : '7px 10px 0 20px'}
          display="flex"
          flexGrow="1"
          overflow={type === 'new-critic' || isModify ? 'visible' : 'scroll'}
        >
          {type === 'new-critic' || isModify ? (
            customTextArea('small')
          ) : (
            <Typography variant="body2" component="blockquote" textAlign="left">
              <Typography variant="body2" component="p">
                {`${criticInfos.text}`}
              </Typography>
              <Typography
                variant="body2"
                component="cite"
                fontWeight="bold"
                fontStyle="italic"
              >
                {userInfos.id === parseInt(id, 10)
                  ? `- ${userInfos.first_name} ${userInfos.last_name} -`
                  : `- ${chosenUser.first_name} ${chosenUser.last_name} -`}
              </Typography>
            </Typography>
          )}
        </Box>
        <Box
          position="absolute"
          top="17.5px"
          right="47.5px"
          height="25px"
          width="25px"
          borderRadius="50%"
          sx={{
            backgroundColor: '#24A5A5',
            boxShadow:
              '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
          }}
        >
          <FormatQuoteIcon sx={{ color: '#fff !important' }} />
        </Box>
      </Stack>
    </>
  );
};

CriticAdvicesReview.propTypes = {
  type: PropTypes.string.isRequired,
  setNewCriticText: PropTypes.func.isRequired,
  criticInfos: PropTypes.object,
  newCriticText: PropTypes.string.isRequired,
  isModify: PropTypes.bool.isRequired,
  newRating: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  chosenUser: PropTypes.object,
};

export default CriticAdvicesReview;
