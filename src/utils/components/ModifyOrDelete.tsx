// Import des libs externes
import {
  Stack,
  Divider,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import CustomAlert from './CustomAlert';

// Import des icônes
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes internes
import { deleteCritic } from '../request/critics/deleteCritic';
import { deleteCriticComment } from '../request/comments/deleteCriticComment';
import { getAllCriticComments } from '../request/comments/getAllCriticComments';
import { deleteAdviceComment } from '@utils/request/comments/deleteAdviceComment';
import { getAllAdviceComments } from '@utils/request/comments/getAllAdviceComments';
import { performUpdatePostProcessing } from '@utils/functions/criticsAdvicesActions';
import { deleteAdvice } from '@utils/request/advices/deleteAdvice';

const ModifyOrDelete = ({
  page,
  parent,
  infos,
  setData,
  chosenUser,
  isModify,
  setIsModify,
  openSnackbar,
  cardsToShow,
  setGoldenMovies,
}) => {
  const { displayType, setChosenMovieId, setChosenMovie } = useData();

  const { id } = useParams();

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const isProfilUserLogged = loggedUserInfos.id === parseInt(id, 10); // Vérifie si le profil affiché est celui de l'utilisateur connecté

  const [showDeleteCriticAdviceModal, setShowDeleteCriticAdviceModal] =
    useState(false);

  // Menu des outils pour modifier / supprimer
  const [displayTools, setDisplayTools] = useState(null);
  const openMenu = Boolean(displayTools);
  const handleToolsMenu = event => {
    setDisplayTools(event.currentTarget);
  };

  const handleTools = async tool => {
    // TO DO : faire apparaitre une modale
    if (
      tool === 'delete' &&
      (parent === 'old-critic' || parent === 'old-advice')
    ) {
      const action = 'delete';

      const userId = page === 'home' ? loggedUserInfos.id : id;

      if (parent === 'old-critic') {
        await deleteCritic(infos.critic_id, displayType);
      } else {
        await deleteAdvice(infos.advice_id, displayType);
      }

      performUpdatePostProcessing(
        page,
        1,
        parent,
        userId,
        isProfilUserLogged,
        displayType,
        action,
        openSnackbar,
        setData,
        cardsToShow,
        setGoldenMovies,
        setShowDeleteCriticAdviceModal,
        setChosenMovie,
        setChosenMovieId,
      );
    } else if (tool === 'delete' && parent === 'comment') {
      let newCommentsData;

      if ('critic_id' in infos) {
        await deleteCriticComment(infos.id, displayType);
        newCommentsData = await getAllCriticComments(
          displayType,
          infos.critic_id,
        );
      } else if ('advice_id' in infos) {
        await deleteAdviceComment(infos.id, displayType);
        newCommentsData = await getAllAdviceComments(
          displayType,
          infos.advice_id,
        );
      }

      setData(newCommentsData.data);
      setDisplayTools(null);
    }
  };

  return (
    <>
      <MoreHorizIcon
        sx={{
          color: 'gray',
          cursor: 'pointer',
        }}
        onClick={handleToolsMenu}
      />
      <Menu
        id="basic-menu"
        anchorEl={displayTools}
        open={openMenu}
        onClose={() => setDisplayTools(null)}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            padding: '0',
          },
        }}
      >
        <Stack
          sx={{
            backgroundColor: '#ededed',
            padding: '5px 8px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <MenuItem
            onClick={() => {
              handleTools('modify');
              setIsModify(!isModify);
              setDisplayTools(null);
            }}
            sx={{ padding: '0', minHeight: 'auto' }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ModeEditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontSize: '0.8em',
                },
              }}
            >
              {!isModify ? 'Modifier' : 'Annuler'}
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setShowDeleteCriticAdviceModal(true);
              setDisplayTools(null);
            }}
            sx={{ padding: '0', minHeight: 'auto' }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ClearIcon fontSize="small" sx={{ color: '#d32f2f' }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontSize: '0.8em',
                  color: '#d32f2f',
                },
              }}
            >
              {'Supprimer'}
            </ListItemText>
          </MenuItem>
        </Stack>
      </Menu>
      {showDeleteCriticAdviceModal ? (
        <CustomAlert
          alertType="warning"
          message={
            parent === 'old-critic' ? (
              <span>
                {'Êtes vous sûr(e) de vouloir supprimer '}
                <strong> {infos.title} </strong>
                {'de vos critiques ?'}
              </span>
            ) : (
              <span>
                {'Êtes vous sûr(e) de ne plus vouloir conseiller '}
                <strong> {infos.title} </strong>
                {'à'}
                <strong>
                  {' '}
                  {`${chosenUser.first_name} ${chosenUser.last_name} ?`}{' '}
                </strong>
              </span>
            )
          }
          setShowModal={setShowDeleteCriticAdviceModal}
          confirmation={handleTools}
        />
      ) : null}
    </>
  );
};

ModifyOrDelete.propTypes = {
  page: PropTypes.string.isRequired,
  infos: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setData: PropTypes.func,
  isModify: PropTypes.bool.isRequired,
  setIsModify: PropTypes.func.isRequired,
  parent: PropTypes.string.isRequired,
  chosenUser: PropTypes.object,
  openSnackbar: PropTypes.func,
  cardsToShow: PropTypes.number,
  setGoldenMovies: PropTypes.func,
};

export default ModifyOrDelete;
