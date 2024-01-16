// Import des libs externes
import { Stack, Box, Typography, Divider, Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des requêtes internes
import { getLikesNumber } from '@utils/request/critics/getLikesNumber';
import { checkLikeStatus } from '@utils/request/critics/checkLikesStatus';
import { addLike } from '@utils/request/critics/addLike';
import { removeLike } from '@utils/request/critics/removeLike';
import { getCommentsNumber } from '@utils/request/comments/getCommentsNumber';

// Import des icônes
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import LibraryAddCheckTwoToneIcon from '@mui/icons-material/LibraryAddCheckTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { removeGold } from '@utils/request/goldNugget/removeGold';
import { addGold } from '@utils/request/goldNugget/addGold';
import { getGoldNumber } from '@utils/request/goldNugget/getGoldNumber';
import { checkGoldStatus } from '@utils/request/goldNugget/checkGoldStatus';

// Import des composants internes
import Particles from '@utils/anims/Particles';
import { getUserMovieStatusRequest } from '@utils/request/list/getUserMovieStatusRequest';
import { addWantedMovieRequest } from '@utils/request/list/addWantedMovieRequest';
import { removeWantedMovieRequest } from '@utils/request/list/removeWantedMovieRequest';
import { addWatchedMovieRequest } from '@utils/request/list/addWatchedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';

const CriticAdvicesFooter = ({
  infos,
  displayComments,
  setDisplayComments,
  comments,
}) => {
  const { displayType } = useData();

  // Id de l'utilisateur du local storage
  const userId = localStorage.getItem('user_id');

  const [commentsNumber, setCommentsNumber] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);
  const [goldNumber, setGoldNumber] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isGold, setIsGold] = useState(false);
  const [particles, setParticles] = useState([]);
  const [userMovieStatus, setUserMovieStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Gestion du menu de choix "à voir", "vu"
  const openSeenMenu = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Compte le nombre de commentaires par critique
  const fetchCommentsNumber = async () => {
    const response = await getCommentsNumber(infos.critic_id, displayType);
    setCommentsNumber(response);
  };

  // Compte le nombre de likes par critique
  const fetchLikesNumber = async () => {
    const response = await getLikesNumber(infos.critic_id, displayType);
    setLikesNumber(response);
  };

  // Compte le nombre de likes par critique
  const fetchGoldNumber = async () => {
    const response = await getGoldNumber(infos.critic_id, displayType);
    setGoldNumber(response);
  };

  // Vérifie si l'utilisateur a déjà liké des critiques
  const checkUserLikeStatus = async () => {
    const response = await checkLikeStatus(infos.critic_id, displayType);
    setHasLiked(response);
  };

  // Vérifie si l'utilisateur a déjà liké des critiques
  const checkUserGoldStatus = async () => {
    const response = await checkGoldStatus(infos.critic_id, displayType);
    setIsGold(response);
  };

  // Vérifie si l'utilisateur souhaite voir le film, l'a déjà vu, ou l'a déjà noté
  const getUserMovieStatus = async () => {
    const response = await getUserMovieStatusRequest(infos.id, displayType);
    setUserMovieStatus(response);
  };

  // Ajoute le film à la liste des films souhaités
  const addWantedMovie = async () => {
    await addWantedMovieRequest(infos.id, displayType);
    handleClose();
    getUserMovieStatus();
  };

  // Retire le film de la liste des films souhaités
  const removeWantedMovie = async () => {
    await removeWantedMovieRequest(infos.id, displayType);
    handleClose();
    getUserMovieStatus();
  };

  // Ajoute le film à la liste des films déjà vus (à noter)
  const addWatchedMovie = async () => {
    await addWatchedMovieRequest(infos.id, displayType);
    handleClose();
    getUserMovieStatus();
  };

  // Retire le film de la liste des films déjà vus
  const removeWatchedMovie = async () => {
    await removeWatchedMovieRequest(infos.id, displayType);
    handleClose();
    getUserMovieStatus();
  };

  // Gérer le clic sur l'icône de like
  const toggleLike = async () => {
    setHasLiked(!hasLiked);
    try {
      if (hasLiked) {
        removeLike(infos.critic_id, displayType);
      } else {
        addLike(infos.critic_id, displayType);
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
        removeGold(infos.critic_id, displayType);
      } else {
        addGold(infos.critic_id, displayType);

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

  useEffect(() => {
    getUserMovieStatus();
  }, []);

  return (
    <>
      <Divider />
      <Stack
        direction="row"
        spacing={5}
        height="30px"
        padding="0 15px"
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
            <img
              src="/images/gold_footer.svg"
              alt=""
              style={{
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
        {/* Affichage de la notation rapide / bouton à voir si la critique n'a pas été émise par l'utilisateur connecté */}
        {infos.sender_id !== parseInt(userId, 10) ? (
          <>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              position="relative"
              onClick={handleClick}
            >
              {userMovieStatus?.isRated || userMovieStatus?.isWatched ? (
                <Stack
                  direction="row"
                  columnGap="5px"
                  alignItems="center"
                  color="#5ac164"
                >
                  <VisibilityTwoToneIcon fontSize="small" />
                  <Typography variant="body2" fontWeight="bold">
                    {'Vu'}
                  </Typography>
                </Stack>
              ) : userMovieStatus?.isWanted ? (
                <Stack direction="row" columnGap="5px" alignItems="center">
                  <LibraryAddCheckTwoToneIcon
                    fontSize="small"
                    color="primary"
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {'À voir'}
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="row" columnGap="5px" alignItems="center">
                  <QueueTwoToneIcon fontSize="small" />
                  <Typography variant="body2" fontWeight="bold">
                    {'Non vu'}
                  </Typography>
                </Stack>
              )}
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={openSeenMenu}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              MenuListProps={{
                sx: {
                  padding: '8px 10px !important',
                },
              }}
              elevation={3}
            >
              <Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  columnGap="5px"
                  sx={{
                    opacity:
                      userMovieStatus?.isRated || userMovieStatus?.isWatched
                        ? '0.3'
                        : '1',
                  }}
                  onClick={
                    !userMovieStatus?.isWanted &&
                    !userMovieStatus?.isRated &&
                    !userMovieStatus?.isWatched
                      ? addWantedMovie
                      : userMovieStatus?.isWanted &&
                        !userMovieStatus?.isRated &&
                        !userMovieStatus?.isWatched
                      ? removeWantedMovie
                      : null
                  }
                >
                  <LibraryAddCheckTwoToneIcon
                    fontSize="small"
                    color={userMovieStatus?.isWanted ? 'primary' : 'inherit'}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {'À voir'}
                  </Typography>
                </Stack>
                <Divider sx={{ margin: '8px' }} />
                <Stack
                  direction="row"
                  alignItems="center"
                  columnGap="5px"
                  onClick={
                    !userMovieStatus?.isWatched && !userMovieStatus?.isRated
                      ? addWatchedMovie
                      : userMovieStatus?.isWatched && !userMovieStatus?.isRated
                      ? removeWatchedMovie
                      : null
                  }
                >
                  <VisibilityTwoToneIcon
                    fontSize="small"
                    color={
                      userMovieStatus?.isWatched || userMovieStatus?.isRated
                        ? 'success'
                        : 'inherit'
                    }
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {'Vu'}
                  </Typography>
                </Stack>
              </Stack>
            </Menu>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              columnGap="5px"
              color={userMovieStatus?.isRated ? '#F29E50' : 'inherit'}
            >
              <Stack direction="row" columnGap="5px" alignItems="center">
                <StarTwoToneIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold">
                  {userMovieStatus?.isRated ? 'Noté' : 'Noter'}
                </Typography>
              </Stack>
            </Box>
          </>
        ) : null}
      </Stack>
    </>
  );
};

CriticAdvicesFooter.propTypes = {
  infos: PropTypes.object.isRequired,
  displayComments: PropTypes.bool.isRequired,
  setDisplayComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CriticAdvicesFooter;
