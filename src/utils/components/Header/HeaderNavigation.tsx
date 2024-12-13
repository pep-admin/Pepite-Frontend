import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwipeIcon from '@mui/icons-material/Swipe';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleIcon from '@mui/icons-material/People';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { handleLogout } from '@utils/request/authRequest';

const pages = ['Accueil', 'Swipe', 'Ma liste', 'Mes contacts', 'Mon profil', 'Paramètres'];

const HeaderNavigation = ({ page }) => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const navigate = useNavigate();
  
  const getPageIcon = (page) => {
    switch(page) {
      case 'Accueil':
        return <HomeIcon sx={{ color: '#dddddd'}} />;
      case 'Swipe':
        return <SwipeIcon sx={{ color: '#dddddd'}} />;
      case 'Ma liste':
        return <ChecklistIcon sx={{ color: '#dddddd'}} />;
      case 'Mes contacts':
        return <PeopleIcon sx={{ color: '#dddddd'}} />;
      case 'Mon profil':
        return <ContactPageIcon sx={{ color: '#dddddd'}} />;
      case 'Paramètres':
        return <SettingsIcon sx={{ color: '#dddddd'}} />;
      default:
        break;
    }
  };

  async function onLogout() {
    await handleLogout();
    localStorage.clear();

    navigate('/login');
  };

  return (
    <Stack
      justifyContent='space-between'
      sx={{
        bgcolor: '#021E1E',
        flexGrow: '1',
        marginTop: '25px',
        paddingBottom: '25px'
      }}
    >
      <nav>
        <List
          disablePadding
          sx={{
            paddingLeft: '20px',
            listStyleType: 'none'
          }}
        >
          {
            pages.map((item, index) => {
              return(
                <React.Fragment key={item}>
                  <ListItem 
                    disablePadding
                    sx={{
                      height: '55px',
                      paddingLeft: '0',
                      backgroundColor: page === item ? '#0b2c2c' : 'inherit'
                    }}
                    onClick={() => {
                      if (item === 'Accueil') {
                        navigate(`/home/${loggedUserInfos.id}`);
                      } else if (item === 'Swipe') {
                        navigate('/swipe');
                      } else if (item === 'Ma liste') {
                        navigate(`/list`);
                      } else if (item === 'Mes contacts') {
                        navigate(`/contacts/${loggedUserInfos.id}`);
                      } else if (item === 'Mon profil') {
                        navigate(`/profil/${loggedUserInfos.id}`);
                      }
  
                    }}
                  >
                    <ListItemButton
                      sx={{
                        height: '100%',
                        columnGap: '20px'
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 'auto'
                        }}
                      >
                        {getPageIcon(item)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item} 
                        sx={{
                          '& .MuiTypography-root': {
                            fontFamily: 'Pragati Narrow, sans-serif',
                            color: '#dddddd'
                          }
                        }}  
                      />
                    </ListItemButton>
                  </ListItem>
                  {
                    index === pages.length - 1 ?
                      null
                    :
                      <Divider sx={{ borderColor: '#173333 '}} />
                  }
                </React.Fragment>
              )
            })
          }
        </List>
      </nav>
      <Stack 
        direction='row'
        justifyContent='center'
        spacing={1}
        onClick={onLogout}
      >
        <LogoutIcon />
        <Typography
          component='span'
          fontFamily='Pragati Narrow, sans-serif'
          color='#dddddd'
        >
          {'Déconnexion'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HeaderNavigation;