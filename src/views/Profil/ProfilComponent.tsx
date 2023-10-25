// Import des libs externes
import {
  Card,
  CardMedia,
  Container,
  Stack,
  Box,
  Avatar,
  Typography,
} from '@mui/material';
import Header from '@utils/Header';

// Import des composants internes
import { Item } from '@utils/styledComponent';
import ProfilDetails from './ProfilDetails';
import ProfilSuggestedNotes from './ProfilSuggestedNotes';

const ProfilComponent = () => {
  return (
    <>
      <Header />
      <Card
        sx={{
          height: '22vh',
          width: '100%',
        }}
      >
        <CardMedia
          image="http://127.0.0.1:5173/images/interstellar.jpg"
          sx={{
            height: '100%',
          }}
        />
      </Card>
      <Container
        maxWidth="xl"
        sx={{
          padding: '6px 8px',
          backgroundColor: '#F4F4F4',
          height: 'calc(100vh - (60px + 22vh))',
        }}
      >
        <Stack height="100%" spacing={1}>
          <Stack direction="row" height="37px" columnGap="8px">
            <Box
              width="calc(30% - 4px)"
              position="relative"
              display="flex"
              justifyContent="center"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 90,
                  height: 90,
                  boxShadow: 'inset 0px 0px 0px 3px #fff',
                  position: 'relative',
                  top: '-51px',
                  left: 0,
                }}
              />
            </Box>
            <Item
              customheight="100%"
              customwidth="calc(70% - 4px)"
              display="flex"
              alignitems="center"
              justifycontent="center"
            >
              <Typography
                component="h2"
                sx={{ color: '#3B3B3B', fontWeight: 'bold' }}
              >
                {'Kate Austen'}
              </Typography>
            </Item>
          </Stack>
          <Stack direction="row" height="40%" columnGap="8px">
            <Item
              customheight="100%"
              customwidth="calc(30% - 4px)"
              padding="7px"
              display="flex"
              flexdirection="column"
            >
              <ProfilDetails />
            </Item>
            <Item customheight="100%" customwidth="calc(70% - 4px)">
              <ProfilSuggestedNotes />
            </Item>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProfilComponent;
