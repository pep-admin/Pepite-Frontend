// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import { useEffect, useState } from 'react';
import { getLikesNumber } from '@utils/request/critics/getLikesNumber';
import { checkLikeStatus } from '@utils/request/critics/checkLikesStatus';
import { addLike } from '@utils/request/critics/addLike';
import { removeLike } from '@utils/request/critics/removeLike';

const CriticAdvicesFooter = ({ criticId }) => {
  const [likesNumber, setLikesNumber] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Compte le nombre de likes par critique au montage du composant
  const fetchLikesNumber = async () => {
    const response = await getLikesNumber(criticId);
    setLikesNumber(response);
  };

  // Vérifie si l'utilisateur a déjà liké des critiques
  const checkUserLikeStatus = async () => {
    const response = await checkLikeStatus(criticId);
    setHasLiked(response);
  };

  useEffect(() => {
    fetchLikesNumber();
    checkUserLikeStatus();
  }, [hasLiked]);

  // Gérer le clic sur l'icône de like
  const toggleLike = async () => {
    setHasLiked(!hasLiked);
    try {
      if (hasLiked) {
        removeLike(criticId);
      } else {
        addLike(criticId);
      }
      fetchLikesNumber();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like', error);
      setHasLiked(hasLiked); // Revenir en arrière si l'action échoue
    }
  };

  return (
    <>
      <Divider />
      <Stack
        direction="row"
        spacing={5}
        height="30px"
        padding="0 17px"
        flexGrow="1"
      >
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <ChatTwoToneIcon
            fontSize="small"
            sx={{ position: 'relative', top: '1px' }}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {5}
          </Typography>
        </Box>
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <ThumbUpTwoToneIcon
            fontSize="small"
            color={hasLiked ? 'success' : 'inherit'}
            sx={{ position: 'relative', bottom: '1px' }}
            onClick={toggleLike}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {likesNumber}
          </Typography>
        </Box>
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <AddToPhotosTwoToneIcon fontSize="small" />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {'À voir'}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

CriticAdvicesFooter.propTypes = {
  criticId: PropTypes.number.isRequired,
};

export default CriticAdvicesFooter;
