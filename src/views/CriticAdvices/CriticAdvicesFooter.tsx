// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Import des requêtes internes
import { getLikesNumber } from '@utils/request/critics/getLikesNumber';
import { checkLikeStatus } from '@utils/request/critics/checkLikesStatus';
import { addLike } from '@utils/request/critics/addLike';
import { removeLike } from '@utils/request/critics/removeLike';
import { getCommentsNumber } from '@utils/request/comments/getCommentsNumber';

// Import des icônes
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { GoldNuggetIcon } from '@utils/styledComponent';
import { removeGold } from '@utils/request/goldNugget/removeGold';
import { addGold } from '@utils/request/goldNugget/addGold';
import { getGoldNumber } from '@utils/request/goldNugget/getGoldNumber';
import { checkGoldStatus } from '@utils/request/goldNugget/checkGoldStatus';

const CriticAdvicesFooter = ({
  criticId,
  displayComments,
  setDisplayComments,
  comments,
}) => {
  const { displayType } = useData();

  const [commentsNumber, setCommentsNumber] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);
  const [goldNumber, setGoldNumber] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isGold, setIsGold] = useState(false);

  // Compte le nombre de commentaires par critique
  const fetchCommentsNumber = async () => {
    const response = await getCommentsNumber(criticId, displayType);
    setCommentsNumber(response);
  };

  // Compte le nombre de likes par critique
  const fetchLikesNumber = async () => {
    const response = await getLikesNumber(criticId, displayType);
    setLikesNumber(response);
  };

  // Compte le nombre de likes par critique
  const fetchGoldNumber = async () => {
    const response = await getGoldNumber(criticId, displayType);
    setGoldNumber(response);
  };

  // Vérifie si l'utilisateur a déjà liké des critiques
  const checkUserLikeStatus = async () => {
    const response = await checkLikeStatus(criticId, displayType);
    setHasLiked(response);
  };

  // Vérifie si l'utilisateur a déjà liké des critiques
  const checkUserGoldStatus = async () => {
    const response = await checkGoldStatus(criticId, displayType);
    setIsGold(response);
  };

  // Gérer le clic sur l'icône de like
  const toggleLike = async () => {
    setHasLiked(!hasLiked);
    try {
      if (hasLiked) {
        removeLike(criticId, displayType);
      } else {
        addLike(criticId, displayType);
      }
      fetchLikesNumber();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like', error);
      setHasLiked(hasLiked); // Revenir en arrière si l'action échoue
    }
  };

  // Gérer le clic sur l'icône de pépite
  const toggleGold = async () => {
    setIsGold(!isGold);
    try {
      if (isGold) {
        removeGold(criticId, displayType);
      } else {
        addGold(criticId, displayType);
      }
      fetchGoldNumber();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like', error);
      setIsGold(isGold); // Revenir en arrière si l'action échoue
    }
  };

  useEffect(() => {
    fetchLikesNumber();
    checkUserLikeStatus();
  }, [hasLiked]);

  useEffect(() => {
    fetchCommentsNumber();
  }, [comments]);

  useEffect(() => {
    fetchGoldNumber();
    checkUserGoldStatus();
  }, [isGold]);

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
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          columnGap="5px"
          onClick={() => setDisplayComments(!displayComments)}
        >
          <ChatTwoToneIcon
            fontSize="small"
            sx={{ position: 'relative', top: '1px' }}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {commentsNumber}
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
          <GoldNuggetIcon
            sx={{
              fontSize: '18px',
              position: 'relative',
              bottom: '1px',
              filter: !isGold ? 'grayscale(1) contrast(0.9)' : 'none',
            }}
            onClick={toggleGold}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {goldNumber}
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
  displayComments: PropTypes.bool.isRequired,
  setDisplayComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CriticAdvicesFooter;
