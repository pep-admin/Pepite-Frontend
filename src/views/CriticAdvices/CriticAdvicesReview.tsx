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
  infos,
  isModify,
  newRating,
  criticUserInfos,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false); // Booleen pour l'affichage de la modale de texte

  // Utilisateur connecté
  const userInfos = JSON.parse(localStorage.getItem('user_infos'));

  useEffect(() => {
    if (isModify) {
      setNewCriticText(infos.text);
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

  if (type === 'old-critic' && infos.text === '' && !isModify) return;

  return (
    <>
      {showReviewModal ? (
        <CriticAdvicesReviewModal
          showReviewModal={showReviewModal}
          setShowReviewModal={setShowReviewModal}
          infos={infos}
          type={type}
          isModify={isModify}
          customTextarea={customTextArea}
          newRating={newRating}
          criticUserInfos={criticUserInfos}
        />
      ) : null}
      <Stack
        direction="row-reverse"
        position="relative"
        borderRadius="10px"
        flexGrow="1"
        marginBottom={
          type === 'new-critic' || type === 'new-advice' || isModify
            ? '7px'
            : '0'
        }
        sx={{
          backgroundColor: '#F1F1F1',
        }}
        onClick={
          type === 'old-critic' && !isModify
            ? () => setShowReviewModal(true)
            : null
        }
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
          alt={`Photo de profil de ${criticUserInfos.first_name} ${criticUserInfos.last_name}`}
          src={
            // Si l'utilisateur qui a posté la critique ou le conseil a défini une photo de profil
            (type === 'old-critic' || type === 'old-advice') &&
            criticUserInfos.profilPics?.length
              ? `${apiBaseUrl}/uploads/${
                  criticUserInfos.profilPics.find(pic => pic.isActive === 1)
                    .filePath
                }`
              : // Si nouvelle critique ou nouveau conseil et que l'utilisateur connecté a défini une photo de profil
              (type === 'new-critic' || type === 'new-advice') &&
                userInfos.profilPics?.length
              ? `${apiBaseUrl}/uploads/${
                  userInfos.profilPics.find(pic => pic.isActive === 1).filePath
                }`
              : // Si l'utilisateur qui a posté la critique || le conseil n'a pas défini de photo de profil
                'http://127.0.0.1:5173/images/default_profil_pic.png'
          }
          sx={{
            width: 60,
            height: 70,
            filter: 'grayscale(1)',
          }}
        />
        <Box
          height={
            type === 'new-critic' || type === 'new-advice' || isModify
              ? '100%'
              : '70px'
          }
          padding={
            type === 'new-critic' || type === 'new-advice' || isModify
              ? '0'
              : '7px 10px 0 20px'
          }
          display="flex"
          flexGrow="1"
          overflow={
            type === 'new-critic' || type === 'new-advice' || isModify
              ? 'visible'
              : 'scroll'
          }
        >
          {type === 'new-critic' || type === 'new-advice' || isModify ? (
            customTextArea('small')
          ) : (
            <Typography variant="body2" component="blockquote" textAlign="left">
              <Typography variant="body2" component="p">
                {`${infos.text}`}
              </Typography>
              <Typography
                variant="body2"
                component="cite"
                fontWeight="bold"
                fontStyle="italic"
              >
                {`- ${criticUserInfos.first_name} ${criticUserInfos.last_name} -`}
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
  infos: PropTypes.object,
  newCriticText: PropTypes.string.isRequired,
  isModify: PropTypes.bool.isRequired,
  newRating: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  criticUserInfos: PropTypes.object.isRequired,
};

export default CriticAdvicesReview;
