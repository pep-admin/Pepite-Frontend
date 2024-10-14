import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwipeIcon from '@mui/icons-material/Swipe';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleIcon from '@mui/icons-material/People';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = ['Accueil', 'Swipe', 'Ma liste', 'Mes contacts', 'Mon profil', 'Paramètres'];

const HeaderNavigation = ({ page }) => {
  
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
  }

  return (
    <Box
      sx={{
        bgcolor: '#021E1E',
        flexGrow: '1',
        marginTop: '25px'
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
                <>
                  <ListItem 
                    key={item} 
                    disablePadding
                    sx={{
                      height: '55px',
                      paddingLeft: '0',
                      backgroundColor: page === item ? '#0b2c2c' : 'inherit'
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
                </>
              )
            })
          }
        </List>
      </nav>
    </Box>
  );
};

export default HeaderNavigation;