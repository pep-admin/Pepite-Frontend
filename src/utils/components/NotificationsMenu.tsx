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
import DOMPurify from 'dompurify';

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
        {notifications.length ? (
          notifications.map((notif, index) => {
            const key = `${notif.type}_${notif.id}`;

            // Nettoyage du message HTML avant de l'injecter pour éviter les attaques XSS
            const cleanMessage = DOMPurify.sanitize(notif.message);

            return (
              <MenuItem
                key={key}
                onClick={
                  notif.type === 'friend_accept'
                    ? () => {
                        navigate(`/profil/${notif.receiver_id}`);
                        // handleCloseNotifMenu();
                      }
                    : notif.type === 'movie_advice' ||
                      notif.type === 'serie_advice'
                    ? () => {
                        setRecommendedMovie(notif);
                        setShowPoster(true);
                        // handleCloseNotifMenu();
                      }
                    : handleCloseNotifMenu
                }
                sx={{
                  whiteSpace: 'normal',
                  flexWrap: 'wrap',
                  padding: '0 4%',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    variant="circular"
                    src={`${apiBaseUrl}/uploads/${notif.profil_pic}`}
                    alt={`photo de profil de ${notif.first_name} ${notif.last_name}`}
                    sx={{ height: 45, width: 45 }}
                  />
                  <Stack>
                    <Typography
                      fontSize="0.8em"
                      lineHeight="1.3"
                      maxWidth="175px"
                      dangerouslySetInnerHTML={{ __html: cleanMessage }}
                    />
                  </Stack>
                </Stack>
                {index !== notifications.length - 1 && (
                  <Divider light sx={{ width: '100%', margin: '8px 0' }} />
                )}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem
            sx={{
              whiteSpace: 'normal',
            }}
          >
            <Typography fontSize="0.85em" lineHeight="1.3" maxWidth="175px">
              {'Aucune notification pour le moment.'}
            </Typography>
          </MenuItem>
        )}
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
