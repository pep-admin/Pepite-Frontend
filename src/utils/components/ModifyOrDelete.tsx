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
import PropTypes from 'prop-types';

// Import des icônes
import EditNoteIcon from '@mui/icons-material/EditNote';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes internes
import { deleteCritic } from '../request/critics/deleteCritic';
import { deleteCriticComment } from '../request/comments/deleteCriticComment';
import { getAllCriticComments } from '../request/comments/getAllCriticComments';
import { getCriticsOfUser } from '../request/critics/getCritics';
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';
import { deleteAdviceComment } from '@utils/request/comments/deleteAdviceComment';
import { getAllAdviceComments } from '@utils/request/comments/getAllAdviceComments';

const ModifyOrDelete = ({
  page,
  parent,
  infos,
  setData,
  isModify,
  setIsModify,
}) => {
  const { displayType } = useData();

  // Menu des outils pour modifier / supprimer
  const [displayTools, setDisplayTools] = useState(null);
  const openMenu = Boolean(displayTools);
  const handleToolsMenu = event => {
    setDisplayTools(event.currentTarget);
  };

  const handleTools = async tool => {
    const userId = localStorage.getItem('user_id');

    // TO DO : faire apparaitre une modale
    if (tool === 'delete' && parent === 'critic') {
      let newCriticsData;

      await deleteCritic(infos.critic_id, displayType);

      if (page === 'home') {
        newCriticsData = await getAllCriticsOfAcquaintances(
          userId,
          displayType,
          1,
        );
      } else if (page === 'profil') {
        newCriticsData = await getCriticsOfUser(userId, displayType, 1);
      } else {
        return;
      }

      setData(newCriticsData);
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
    }
  };

  return (
    <>
      <EditNoteIcon
        sx={{ position: 'relative', left: '4px', cursor: 'pointer' }}
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
              handleTools('delete');
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
};

export default ModifyOrDelete;
