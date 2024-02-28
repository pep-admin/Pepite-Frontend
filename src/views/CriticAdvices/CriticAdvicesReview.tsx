// Import des libs externes
import {
  Stack,
  Box,
  Typography,
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
import UserAvatar from '@utils/components/UserAvatar';
import { useParams } from 'react-router-dom';

const CriticAdvicesReview = ({
  type,
  newCriticText,
  setNewCriticText,
  infos,
  isModify,
  newRating,
  criticUserInfos,
}) => {
  const { id } = useParams();

  const [showReviewModal, setShowReviewModal] = useState(false); // Booleen pour l'affichage de la modale de texte

  // Utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

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
        sx={{ 
          height: '100%', 
          flexGrow: '1',
        }}
      >
        <InputLabel
          htmlFor="custom-outlined-input"
          sx={{ fontStyle: 'italic', overflow: 'visible' }}
        >
          {loggedUserInfos.id === parseInt(id, 10)
            ? 'Votre critique'
            : 'Votre conseil'}
        </InputLabel>
        <OutlinedInput
          id="custom-outlined-input"
          label={
            loggedUserInfos.id === parseInt(id, 10)
              ? 'Votre critique'
              : 'Votre conseil'
          }
          placeholder={`Vous pouvez rédiger ${
            loggedUserInfos.id === parseInt(id, 10)
              ? 'une nouvelle critique'
              : 'un nouveau conseil'
          }`}
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
        <UserAvatar
          variant={'square'}
          userInfos={
            type === 'new-critic' || type === 'new-advice'
              ? loggedUserInfos
              : criticUserInfos?.id &&
                criticUserInfos?.id !== loggedUserInfos.id
              ? criticUserInfos
              : loggedUserInfos
          }
          picWidth={60}
          picHeight={70}
          isOutlined={false}
          outlineWidth={null}
          relationType={null}
          sx={{ filter: 'grayscale(1)' }}
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
