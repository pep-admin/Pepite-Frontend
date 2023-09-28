// Import de libs externes
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Collapse,
  IconButton,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';

const About = () => {
  const [openHelpMain, setOpenHelpMain] = useState(false);
  const [openHelpSwipe, setOpenHelpSwipe] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: '#0E6666',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: '#0E6666',
          height: '90%',
          textAlign: 'center',
          padding: '0 7%',
          margin: '35px 0',
        }}
      >
        <Box>
          <Typography
            variant="h1"
            color={'#24A5A5'}
            fontSize={'4em'}
            marginBottom={'35px'}
          >
            {'Pépite.'}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#094B4B',
            borderRadius: '20px',
            padding: '20px 0',
            marginBottom: '35px',
          }}
        >
          <Typography
            variant="h3"
            fontSize={'1.2em'}
            color={'secondary.contrastText'}
            gutterBottom
          >
            {'Bienvenue sur '}
            <Typography
              variant="h3"
              component="span"
              className="brand-font"
              fontSize={'1.2em'}
              color={'primary.main'}
            >
              {'Pépite.'}
            </Typography>
          </Typography>
          <Box sx={{ p: '0 5%' }}>
            <Typography
              variant="h4"
              fontSize="1.2em"
              color="primary.main"
              textAlign="left"
            >
              {'Vous pouvez maintenant :'}
            </Typography>
            <List
              sx={{
                color: 'secondary.contrastText',
                fontSize: '0.9em',
                paddingInlineStart: '5%',
              }}
            >
              <ListItem>
                {
                  'Découvrir de nouveaux films / séries selon les notations de vos amis.'
                }
              </ListItem>
              <ListItem>
                {
                  'Noter ou donner votre avis pour aider vos amis à trouver la perle rare.'
                }
              </ListItem>
              <ListItem>
                {
                  'Découvrir de nouveaux films / séries grâce à notre système de swipe.'
                }
              </ListItem>
            </List>
          </Box>
          <Box
            sx={{
              p: '0 5%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              fontSize="1.2em"
              color="primary.main"
              textAlign="left"
            >
              {'Comment ça marche ?'}
            </Typography>
            <IconButton
              onClick={() => setOpenHelpMain(!openHelpMain)}
              sx={{ color: 'primary.main' }}
            >
              <ExpandMoreIcon
                style={{
                  transform: openHelpMain ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </IconButton>
          </Box>
          <Box sx={{ p: '0 5%' }}>
            <Collapse in={openHelpMain}>
              <List
                sx={{
                  color: 'secondary.contrastText',
                  fontSize: '0.9em',
                  paddingInlineStart: '5%',
                }}
              >
                <ListItem>
                  {
                    'Ajoutez de nouveaux amis ou suivez de nouvelles personnes avec qui vous partagez les goûts.'
                  }
                </ListItem>
                <ListItem>
                  {
                    'Vous pouvez chercher directement de nouveaux films / séries en tapant leur nom, en allant visiter le profil de vos amis, ou aléatoirement grâce à notre système de swipe.'
                  }
                </ListItem>
                <ListItem>
                  {
                    'Ajoutez ces films / séries à votre liste à voir puis notez les ! Vos amis vous en seront reconnaissants !'
                  }
                </ListItem>
              </List>
            </Collapse>
          </Box>
          <Box
            sx={{
              p: '0 5%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              fontSize="1.2em"
              color="primary.main"
              textAlign="left"
            >
              {'Système de swipe'}
            </Typography>
            <IconButton
              onClick={() => setOpenHelpSwipe(!openHelpSwipe)}
              sx={{ color: 'primary.main' }}
            >
              <ExpandMoreIcon
                style={{
                  transform: openHelpSwipe ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </IconButton>
          </Box>
          <Box sx={{ p: '0 5%' }}>
            <Collapse in={openHelpSwipe}>
              <List
                sx={{
                  color: 'secondary.contrastText',
                  paddingInlineStart: '0',
                }}
              >
                {/* Swipe left */}
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                  }}
                >
                  <SwipeLeftIcon
                    sx={{
                      marginRight: 1,
                      color: '#FFDA1B',
                      position: 'relative',
                      bottom: '4px',
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      whiteSpace: 'nowrap',
                      color: '#FFDA1B',
                      marginRight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Précédent : '}
                  </Typography>
                  <Typography variant="body2">
                    {'reviens au film / série précédent.'}
                  </Typography>
                </ListItem>

                {/* Swipe right */}
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                  }}
                >
                  <SwipeRightIcon
                    sx={{
                      marginRight: 1,
                      color: '#FFDA1B',
                      position: 'relative',
                      bottom: '4px',
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      whiteSpace: 'nowrap',
                      color: '#FFDA1B',
                      marginRight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Suivant : '}
                  </Typography>
                  <Typography variant="body2">
                    {'passe au film / série suivant.'}
                  </Typography>
                </ListItem>

                {/* Swipe down */}
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                  }}
                >
                  <SwipeDownIcon
                    sx={{
                      marginRight: 1,
                      color: '#FFDA1B',
                      position: 'relative',
                      bottom: '4px',
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      whiteSpace: 'nowrap',
                      color: '#FFDA1B',
                      marginRight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Je veux le voir : '}
                  </Typography>
                  <Typography variant="body2">
                    {'ajoute le film / série à votre liste.'}
                  </Typography>
                </ListItem>

                {/* Swipe up */}
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                  }}
                >
                  <SwipeUpIcon
                    sx={{
                      marginRight: 1,
                      color: '#FFDA1B',
                      position: 'relative',
                      bottom: '4px',
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      whiteSpace: 'nowrap',
                      color: '#FFDA1B',
                      marginRight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Non merci : '}
                  </Typography>
                  <Typography variant="body2">
                    {"n'ajoute pas le film / série à votre liste/"}
                  </Typography>
                </ListItem>

                {/* Déjà vu */}
                <ListItem
                  sx={{
                    display: 'flex',
                    padding: '8px 0',
                    alignItems: 'flex-start',
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      minWidth: '70px',
                      color: '#3B3B3B',
                      fontSize: '0.8em',
                      marginRight: 1,
                      padding: '10px 0',
                    }}
                  >
                    {'Déjà vu ?'}
                  </Button>
                  <Typography variant="body2">
                    {
                      'Vous pouvez cliquer sur ce bouton si vous avez déjà vu ce film / série.'
                    }
                  </Typography>
                </ListItem>
              </List>
            </Collapse>
          </Box>
        </Box>
        <Button variant="contained" color="primary" href="http://127.0.0.1:5173/swipe" >
          {"C'est parti !"}
        </Button>
      </Container>
    </Box>
  );
};

export default About;
