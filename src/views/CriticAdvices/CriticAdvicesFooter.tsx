// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Divider,
  Menu,
  ListItemIcon,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import LibraryAddCheckTwoToneIcon from '@mui/icons-material/LibraryAddCheckTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants internes
import QuickMenu from '@utils/components/QuickMenu';
import LikesFooter from './LikesFooter';

// Import des requêtes internes
import { getCommentsNumber } from '@utils/request/comments/getCommentsNumber';
import { getUserMovieStatusRequest } from '@utils/request/list/getUserMovieStatusRequest';
import { addWantedMovieRequest } from '@utils/request/list/addWantedMovieRequest';
import { removeWantedMovieRequest } from '@utils/request/list/removeWantedMovieRequest';
import { addWatchedMovieRequest } from '@utils/request/list/addWatchedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';
import GoldFooter from './GoldFooter';

const CriticAdvicesFooter = ({
  data,
  infos,
  displayComments,
  setDisplayComments,
  comments,
}) => {
  const { displayType } = useData();

  // L'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const [commentsNumber, setCommentsNumber] = useState(0); // Le nombre de commentaires d'une critique
  const [userMovieStatus, setUserMovieStatus] = useState(null); // Film non vu, à voir, film vu, film noté
  const [anchorSeenMenu, setAnchorSeenMenu] = useState(null); // Le menu qui permet de mettre un film non vu, à voir, vu
  const [anchorNoteMenu, setAnchorNoteMenu] = useState(null); // Le menu qui permet de noter rapidement un film
  const [isQuicklyRated, setIsQuicklyRated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const openSeenMenu = Boolean(anchorSeenMenu); // Gestion du menu de choix "à voir", "vu"
  const openNoteMenu = Boolean(anchorNoteMenu); // Gestion du menu de notation rapide

  const handleClickSeenMenu = event => {
    setAnchorSeenMenu(event.currentTarget);
  };

  const handleCloseSeenMenu = () => {
    setAnchorSeenMenu(null);
  };

  const handleClickNoteMenu = event => {
    setAnchorNoteMenu(event.currentTarget);
  };

  const handleCloseNoteMenu = () => {
    setAnchorNoteMenu(null);
  };

  // Compte le nombre de commentaires par critique
  const fetchCommentsNumber = async () => {
    const response = await getCommentsNumber(infos.critic_id, displayType);
    setCommentsNumber(response);
  };

  // Vérifie si l'utilisateur souhaite voir le film, l'a déjà vu, ou l'a déjà noté
  const getUserMovieStatus = async () => {
    const response = await getUserMovieStatusRequest(infos.id, displayType);
    setUserMovieStatus(response);
  };

  // Ajoute le film à la liste des films souhaités
  const addWantedMovie = async () => {
    await addWantedMovieRequest(infos.id, displayType);
    handleCloseSeenMenu();
    getUserMovieStatus();
  };

  // Retire le film de la liste des films souhaités
  const removeWantedMovie = async () => {
    await removeWantedMovieRequest(infos.id, displayType);
    handleCloseSeenMenu();
    getUserMovieStatus();
  };

  // Ajoute le film à la liste des films déjà vus (à noter)
  const addWatchedMovie = async () => {
    await addWatchedMovieRequest(infos.id, displayType);
    handleCloseSeenMenu();
    getUserMovieStatus();
  };

  // Retire le film de la liste des films déjà vus
  const removeWatchedMovie = async () => {
    await removeWatchedMovieRequest(infos.id, displayType);
    handleCloseSeenMenu();
    getUserMovieStatus();
  };

  useEffect(() => {
    fetchCommentsNumber();
  }, [comments]);

  useEffect(() => {
    getUserMovieStatus();
  }, [isQuicklyRated, data]);

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
        <LikesFooter infos={infos} />
        <GoldFooter infos={infos} />
        {/* Affichage de la notation rapide / bouton à voir si la critique n'a pas été émise par l'utilisateur connecté */}
        {infos.user_id !== parseInt(loggedUserInfos.id, 10) ? (
          <>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              position="relative"
              onClick={handleClickSeenMenu}
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
              anchorEl={anchorSeenMenu}
              open={openSeenMenu}
              onClose={handleCloseSeenMenu}
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
              autoFocus={false}
            >
              <MenuItem
                sx={{
                  height: '25px',
                  padding: '0',
                  minHeight: 'auto !important',
                  columnGap: '7px',
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
                <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                  <LibraryAddCheckTwoToneIcon
                    fontSize="small"
                    color={userMovieStatus?.isWanted ? 'primary' : 'inherit'}
                  />
                </ListItemIcon>
                <Typography fontSize="0.8em" lineHeight="normal">
                  {'À voir'}
                </Typography>
              </MenuItem>
              <Divider sx={{ margin: '8px' }} />
              <MenuItem
                sx={{
                  height: '25px',
                  padding: '0',
                  minHeight: 'auto !important',
                  columnGap: '7px',
                }}
                onClick={
                  !userMovieStatus?.isWatched && !userMovieStatus?.isRated
                    ? addWatchedMovie
                    : userMovieStatus?.isWatched && !userMovieStatus?.isRated
                    ? removeWatchedMovie
                    : null
                }
              >
                <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                  <VisibilityTwoToneIcon
                    fontSize="small"
                    color={
                      userMovieStatus?.isWatched || userMovieStatus?.isRated
                        ? 'success'
                        : 'inherit'
                    }
                  />
                </ListItemIcon>
                <Typography fontSize="0.8em" lineHeight="normal">
                  {'Vu'}
                </Typography>
              </MenuItem>
            </Menu>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              columnGap="5px"
              color={userMovieStatus?.isRated ? '#F29E50' : 'inherit'}
              onClick={handleClickNoteMenu}
            >
              <Stack direction="row" columnGap="5px" alignItems="center">
                <StarTwoToneIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold">
                  {userMovieStatus?.isRated ? 'Noté' : 'Noter'}
                </Typography>
              </Stack>
            </Box>
            {openNoteMenu && (
              <QuickMenu
                infos={infos}
                handleCloseNoteMenu={handleCloseNoteMenu}
                anchorNoteMenu={anchorNoteMenu}
                openNoteMenu={openNoteMenu}
                setIsQuicklyRated={setIsQuicklyRated}
                setOpenSnackbar={setOpenSnackbar}
              />
            )}
          </>
        ) : null}
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        message={`Nouvelle notation pour ${infos.title} ajoutée.`}
      />
    </>
  );
};

CriticAdvicesFooter.propTypes = {
  data: PropTypes.array.isRequired,
  infos: PropTypes.object.isRequired,
  displayComments: PropTypes.bool.isRequired,
  setDisplayComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CriticAdvicesFooter;
