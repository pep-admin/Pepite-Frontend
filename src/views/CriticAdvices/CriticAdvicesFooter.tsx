// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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

// Import des composants internes
import Particles from '@utils/anims/Particles';

const CriticAdvicesFooter = ({
  criticId,
  displayComments,
  setDisplayComments,
  comments,
}) => {
  const { displayType } = useData();

  // Id de l'utilisateur des paramètres de requête
  const { id } = useParams();
  // Id de l'utilisateur du local storage
  const userId = localStorage.getItem('user_id');

  const [commentsNumber, setCommentsNumber] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);
  const [goldNumber, setGoldNumber] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isGold, setIsGold] = useState(false);
  const [particles, setParticles] = useState([]);

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

        const newParticles = [];

        // Génère une explosion de 10 particules lors du clic sur la pépite footer
        for (let i = 0; i < 10; i++) {
          const animationClass = `particles animatedParticles${i}`;

          newParticles.push({
            id: i,
            color: `hsl(${30 + Math.random() * 10}, ${
              70 + Math.random() * 30
            }%, ${50 + Math.random() * 20}%)`, // Couleur orange aléatoire
            size: 0.2 + Math.random() * 0.25,
            animationClass: animationClass,
          });
        }
        console.log(newParticles);

        setParticles(newParticles);

        // Nettoyage après animation
        setTimeout(() => {
          setParticles([]);
        }, 1500);
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
            sx={{
              position: 'relative',
              top: '1px',
              color: displayComments ? '#24a5a5' : 'inherit',
            }}
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
          <Box
            display="flex"
            alignItems="center"
            sx={{
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={toggleGold}
          >
            <GoldNuggetIcon
              sx={{
                fontSize: '18px',
                position: 'relative',
                bottom: '1px',
                filter: !isGold ? 'grayscale(1) contrast(0.9)' : 'none',
              }}
            />
            <Particles particles={particles} />
          </Box>
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {goldNumber}
          </Typography>
        </Box>
        {/* Affichage conditionnel de la notation rapide / bouton à voir si profil de l'utilisateur connecté */}
        {id !== userId ? (
          <Box height="100%" display="flex" alignItems="center" columnGap="5px">
            <AddToPhotosTwoToneIcon fontSize="small" />
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {'À voir'}
            </Typography>
          </Box>
        ) : null}
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
