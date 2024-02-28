import { Box, Button, Divider, FormControl, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useEffect, useState } from 'react';
import CriticAdvicesReviewModal from './CriticAdvicesReviewModal';
import { useParams } from 'react-router-dom';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const CriticAdvicesReview2 = ({ infos, type, isModify, newCriticText, setNewCriticText, newRating, criticUserInfos }) => {

  // Utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const { id } = useParams();

  const [showReviewModal, setShowReviewModal] = useState(false); // Booleen pour l'affichage de la modale de texte

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
          margin: type === 'new-critic' || type === 'new-advice' ? '10px 0 10px 0' : '6px 0 0 0'
        }}
      >
        {size === 'small' &&
          <Box
            position="absolute"
            right="-5px"
            top="-11.5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="10"
            sx={{
              backgroundColor: '#f2f2f2',
            }}
            onClick={() => setShowReviewModal(true)}
          >
            <FullscreenIcon />
          </Box>
        }
        <InputLabel
          htmlFor="custom-outlined-input"
          sx={{ 
            fontStyle: 'italic', 
            overflow: 'visible',
            '&&.Mui-focused': {
              color: '#24A5A5',
            },
          }}
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
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#24A5A5',
              borderWidth: '1px'
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
              marginTop: '15px',
              backgroundColor: '#F29E50',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F29E50',
              },
            }}
            onClick={() => setShowReviewModal(false)}
          >
            <Typography>
              {'Valider le texte'}
            </Typography>
          </Button>
        ) : null}
      </FormControl>
    );
  }

  return (
    <>
      {showReviewModal && (
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
      )}
      {type === 'new-critic' || type === 'new-advice' || isModify ? (
        customTextArea('small')
        ) : (
        <Stack 
          bgcolor='#f2f2f2' 
          flexGrow='1' 
          padding='5px 10px'
          sx={{
            borderRadius: '5px'
          }}
          onClick={() => setShowReviewModal(true)}
        >
          <Stack direction='row' columnGap='5px' marginBottom='5px'>
            <FormatQuoteIcon fontSize='small' sx={{ color: '#0E6666'}}/>
            <Typography variant='body1' fontWeight='600' color='#0E6666'>
              {'Votre critique'}
            </Typography>
          </Stack>
          <Divider />
          <Stack padding='5px 10px'>
            <Typography 
              variant='body2' 
              align='left'
              fontWeight='400'
              whiteSpace='pre-line'
              >
              {`${infos.text}`}
            </Typography>
          </Stack>
        </Stack>
        )
      }
     
    </>
  );
};

export default CriticAdvicesReview2;