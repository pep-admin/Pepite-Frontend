// Import des libs externes
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';

// Import des variables d'environnement
import { apiBaseUrl } from '@utils/request/config';

const NotificationsMenu = ({
  page,
  anchorElNotif,
  openNotif,
  handleCloseNotifMenu,
  notifications,
}) => {
  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const navigate = useNavigate();

  const [showPoster, setShowPoster] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState({});

  console.log('les notifs', notifications);

  const generateContent = (notificationType, firstName, lastName) => {
    switch (notificationType) {
      case 'friendRequest':
        return (
          <span>
            <strong>
              {firstName} {lastName}
            </strong>
            {" souhaite vous ajouter à sa liste d'amis."}
          </span>
        );
      case 'acceptedFriendRequest':
        return (
          <span>
            <strong>
              {firstName} {lastName}
            </strong>
            {" a accepté votre demande d'amitié."}
          </span>
        );
      case 'movieAdvice':
        return (
          <span>
            <strong>
              {firstName} {lastName}
            </strong>
            {' vous a conseillé un nouveau film.'}
          </span>
        );
      case 'serieAdvice':
        return (
          <span>
            <strong>
              {firstName} {lastName}
            </strong>
            {' vous a conseillé une nouvelle série.'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorElNotif}
        open={openNotif}
        onClose={handleCloseNotifMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiPaper-root': {
            maxHeight: '220px',
          },
        }}
      >
        {notifications.map((notif, index) => {
          const key = `${notif.type}_${notif.id}`;

          return (
            <MenuItem
              key={key}
              onClick={
                notif.type === 'acceptedFriendRequest'
                  ? () => {
                      navigate(`/profil/${notif.receiver_id}`);
                      handleCloseNotifMenu();
                    }
                  : notif.type === 'movieAdvice' || notif.type === 'serieAdvice'
                  ? () => {
                      setRecommendedMovie(notif);
                      setShowPoster(true);
                      handleCloseNotifMenu();
                    }
                  : handleCloseNotifMenu
              }
              sx={{
                whiteSpace: 'normal',
                flexWrap: 'wrap',
              }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  variant="circular"
                  src={`${apiBaseUrl}/uploads/${notif.profil_pic}`}
                  alt={`photo de profil de ${notif.first_name} ${notif.last_name}`}
                  sx={{ height: 40, width: 40 }}
                />
                <Stack>
                  <Typography variant="body2" maxWidth="200px">
                    {generateContent(
                      notif.type,
                      notif.first_name,
                      notif.last_name,
                    )}
                  </Typography>
                </Stack>
              </Stack>
              {index !== notifications.length - 1 && (
                <Divider sx={{ width: '100%', margin: '8px 0' }} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
      {showPoster && (
        <CriticAdvicesModal
          page={page}
          showPoster={showPoster}
          setShowPoster={setShowPoster}
          loggedUserInfos={loggedUserInfos}
          infos={recommendedMovie}
          from={'notifications'}
        />
      )}
    </>
  );
};

NotificationsMenu.propTypes = {
  page: PropTypes.string.isRequired,
  anchorElNotif: PropTypes.object,
  openNotif: PropTypes.bool.isRequired,
  handleCloseNotifMenu: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default NotificationsMenu;
