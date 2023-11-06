// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  Fade,
  Divider,
} from '@mui/material';
import { useState } from 'react';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  FollowerIcon,
  FollowedIcon,
  GoldNuggetIcon,
} from '@utils/styledComponent';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const ProfilDetails = () => {
  // ***** Affichage des amis, abonnements et abonnés ***** //
  const [displayContacts, setDisplayContacts] = useState(null);
  const openMenu = Boolean(displayContacts);
  const handleContactMenu = event => {
    setDisplayContacts(event.currentTarget);
  };

  return (
    <>
      <Stack direction="column" alignItems="center">
        <LinearProgress
          color="success"
          variant="determinate"
          value={30}
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      <Stack flexGrow={1}>
        <List
          sx={{
            listStyleType: 'none',
            height: '100%',
            padding: '7px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <StarIcon fontSize="small" color="secondary" />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="secondary"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {'96'}
              </Typography>
              <Typography component="p" variant="body2" color="secondary">
                {'notations'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                  width: '20px',
                }}
              >
                <GoldNuggetIcon sx={{ fontSize: '18px' }} />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#EDC800"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {'4'}
              </Typography>
              <Typography component="p" variant="body2" color="#EDC800">
                {'pépites'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <LocalMoviesIcon fontSize="small" sx={{ color: '#3B3B3B' }} />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#3B3B3B"
                marginRight="2.5px"
                fontWeight="bold"
              >
                {'Ma liste'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton
              id="fade-button"
              aria-controls={openMenu ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              sx={{ padding: '0' }}
              onClick={handleContactMenu}
            >
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <PeopleAltIcon
                  fontSize="small"
                  sx={{ color: '#3B3B3B', position: 'relative', left: '1px' }}
                />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#3B3B3B"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {'Contacts'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={displayContacts}
            open={openMenu}
            onClose={() => setDisplayContacts(null)}
            TransitionComponent={Fade}
          >
            <Box padding="0 8px">
              <ListItem
                sx={{ display: 'flex', padding: '0', columnGap: '5px' }}
              >
                <ListItemIcon
                  sx={{ position: 'relative', bottom: '1px', minWidth: 'auto' }}
                >
                  <PeopleAltIcon fontSize="small" color="secondary" />
                </ListItemIcon>
                <ListItemButton sx={{ padding: '0', display: 'flex' }}>
                  <Typography
                    component="p"
                    variant="body2"
                    color="secondary"
                    fontWeight="bold"
                    marginRight="2.5px"
                  >
                    {'45'}
                  </Typography>
                  <Typography component="p" variant="body2" color="secondary">
                    {'amis'}
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', padding: '0', columnGap: '5px' }}
              >
                <ListItemIcon
                  sx={{ position: 'relative', bottom: '1px', minWidth: 'auto' }}
                >
                  <FollowerIcon sx={{ width: '20px', height: '15px' }} />
                </ListItemIcon>
                <ListItemButton sx={{ padding: '0', display: 'flex' }}>
                  <Typography
                    component="p"
                    variant="body2"
                    color="#24A5A5"
                    fontWeight="bold"
                    marginRight="2.5px"
                  >
                    {'32'}
                  </Typography>
                  <Typography component="p" variant="body2" color="#24A5A5">
                    {'abonnés'}
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', padding: '0', columnGap: '5px' }}
              >
                <ListItemIcon
                  sx={{ position: 'relative', bottom: '1px', minWidth: 'auto' }}
                >
                  <FollowedIcon sx={{ width: '20px', height: '15px' }} />
                </ListItemIcon>
                <ListItemButton sx={{ padding: '0', display: 'flex' }}>
                  <Typography
                    component="p"
                    variant="body2"
                    color="#094B4B"
                    fontWeight="bold"
                    marginRight="2.5px"
                  >
                    {'24'}
                  </Typography>
                  <Typography component="p" variant="body2" color="#094B4B">
                    {'abonnements'}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Box>
          </Menu>
        </List>
      </Stack>
    </>
  );
};

export default ProfilDetails;
