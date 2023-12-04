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

// Import des requêtes internes
import { deleteCritic } from './request/critics/deleteCritic';
import { getAllCriticsOfUser } from './request/critics/getCritics';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { deleteComment } from './request/comments/deleteComment';
import { getAllCriticComments } from './request/comments/getComments';

const ModifyOrDelete = ({ parent, infos, setInfos, isModify, setIsModify }) => {
  const { displayType } = useData();

  // Menu des outils pour modifier / supprimer
  const [displayTools, setDisplayTools] = useState(null);
  const openMenu = Boolean(displayTools);
  const handleToolsMenu = event => {
    setDisplayTools(event.currentTarget);
  };

  const handleCriticTools = async tool => {
    const userId = localStorage.getItem('user_id');

    if (tool === 'delete' && parent === 'critic') {
      // TO DO: faire apparaître une modale
      await deleteCritic(infos.critic_id, displayType);
      const newCriticsData = await getAllCriticsOfUser(userId, displayType);
      setInfos(newCriticsData);
    }
    else if (tool === 'delete' && parent === 'comment') {      
      await deleteComment(infos.id, displayType);
      const newCommentsData = await getAllCriticComments(displayType, infos.critic_id);      
      setInfos(newCommentsData.data);
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
              handleCriticTools('delete');
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
  infos: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setInfos: PropTypes.func.isRequired,
  isModify: PropTypes.bool.isRequired,
  setIsModify: PropTypes.func.isRequired,
};

export default ModifyOrDelete;
