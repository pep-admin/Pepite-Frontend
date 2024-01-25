// Import des libs externes
import { Stack, Typography, Divider, List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { Item } from '@utils/styledComponent';

// Import des icônes
import { NoCriticSvg } from '@utils/styledComponent';

const NoCriticAdvice = ({ page }) => {
  return (
    <Item margintop="6px" minheight="175.8px">
      <Stack height="100%">
        <Stack direction="column" justifyContent="center" height="25px">
          <Typography fontSize="1em" padding="0 10px">
            {'Aucun contenu à afficher pour le moment.'}
          </Typography>
          <Divider />
        </Stack>
        <Stack height="180px" padding="10px 8px">
          <Stack direction="row" height="100%">
            <Stack
              height="100%"
              width="35%"
              bgcolor="#EFEFEF"
              borderRadius="10px"
              justifyContent="center"
              alignItems="center"
            >
              <NoCriticSvg sx={{ fontSize: '4.8em' }} />
            </Stack>
            <Stack direction="column" flexGrow="1">
              <Typography
                component="p"
                fontSize="1em"
                fontWeight="bold"
                sx={{
                  color: '#5C5C5C',
                  marginBottom: '8px',
                }}
              >
                {page === 'profil'
                  ? 'Sur votre profil, vous trouverez :'
                  : 'Ici, vous pourrez voir les critiques :'}
              </Typography>
              <List disablePadding>
                <ListItem
                  disablePadding
                  sx={{
                    width: 'calc(100% - 30px)',
                    marginLeft: '30px',
                    marginBottom: '5px',
                    listStyleType: 'circle',
                  }}
                >
                  <Typography
                    component="p"
                    fontSize="1em"
                    fontWeight="bold"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {page === 'profil' ? (
                      'Toutes vos critiques'
                    ) : (
                      <>
                        De vos{' '}
                        <span style={{ color: '#ff7b00' }}>amis proches</span>
                      </>
                    )}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {page === 'profil'
                      ? 'de films et séries'
                      : 'En première position'}
                  </Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    width: 'calc(100% - 30px)',
                    marginLeft: '30px',
                    marginBottom: '5px',
                    listStyleType: 'circle',
                  }}
                >
                  <Typography
                    component="p"
                    fontSize="1em"
                    fontWeight="bold"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {page === 'profil' ? (
                      'Tous les conseils'
                    ) : (
                      <>
                        De vos <span style={{ color: '#F29E50' }}>amis</span>
                      </>
                    )}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {page === 'profil'
                      ? 'de la part de vos amis'
                      : 'En seconde position'}
                  </Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    width: 'calc(100% - 30px)',
                    marginLeft: '30px',
                    listStyleType: 'circle',
                  }}
                >
                  <Typography
                    component="p"
                    fontSize="1em"
                    fontWeight="bold"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {page === 'profil' ? (
                      'Votre grade de notation'
                    ) : (
                      <>
                        Des personnes{' '}
                        <span style={{ color: '#24A5A5' }}>suivies</span>
                      </>
                    )}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      color: '#5C5C5C',
                    }}
                  >
                    {'En troisième position'}
                  </Typography>
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Item>
  );
};

NoCriticAdvice.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NoCriticAdvice;
