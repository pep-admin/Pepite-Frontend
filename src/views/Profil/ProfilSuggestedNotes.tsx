// Import des libs externes
import {
  Stack,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

// Import des icônes étoile vide
import { OrangeRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';

const ProfilSuggestedNotes = () => {
  return (
    <Stack direction="column" height="100%">
      <Stack
        direction="row"
        height="24.2px"
        justifyContent="space-between"
        alignItems="center"
        padding="0 10px"
      >
        <Typography variant="body2" component="p">
          {'Dernières notations de Kate'}
        </Typography>
        <Typography variant="body2" component="p">
          {'Voir +'}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        height="calc(100% - 25px)"
        justifyContent="flex-start"
        padding="7px 10px"
        gap="10px"
        overflow="hidden"
      >
        <Card
          sx={{
            width: 95,
            height: '145px',
            flexShrink: 0,
            boxShadow: 'none',
            position: 'relative',
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="120"
              image="http://127.0.0.1:5173/images/platoon.jpg"
              alt="green iguana"
              sx={{
                borderRadius: '10px',
                boxShadow:
                  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
              }}
            />
          </CardActionArea>
          <CardContent sx={{ padding: 0 }}>
            <Typography
              gutterBottom
              component="h4"
              margin="0"
              sx={{ fontSize: '1em' }}
            >
              Platoon
            </Typography>
          </CardContent>
          <Box
            width="100%"
            position="absolute"
            bottom="25px"
            height="25px"
            borderRadius="0 0 10px 10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#0000009e' }}
          >
            <OrangeRating
              name="half-rating-read"
              value={2.5}
              precision={0.1}
              readOnly
              emptyIcon={
                <StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />
              }
              sx={{ marginRight: '5px' }}
            />
          </Box>
        </Card>
        <Card
          sx={{
            width: 95,
            height: '145px',
            flexShrink: 0,
            boxShadow: 'none',
            position: 'relative',
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="120"
              image="http://127.0.0.1:5173/images/317e.jpg"
              alt="green iguana"
              sx={{
                borderRadius: '10px',
                boxShadow:
                  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
              }}
            />
          </CardActionArea>
          <CardContent sx={{ padding: 0 }}>
            <Typography
              gutterBottom
              component="h4"
              margin="0"
              sx={{ fontSize: '1em' }}
            >
              La 317e section
            </Typography>
          </CardContent>
          <Box
            width="100%"
            position="absolute"
            bottom="25px"
            height="25px"
            borderRadius="0 0 10px 10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#0000009e' }}
          >
            <OrangeRating
              readOnly
              emptyIcon={
                <StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />
              }
            />
          </Box>
        </Card>
        <Card
          sx={{
            width: 95,
            height: '145px',
            flexShrink: 0,
            boxShadow: 'none',
            position: 'relative',
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="120"
              image="http://127.0.0.1:5173/images/mars.jpg"
              alt="green iguana"
              sx={{
                borderRadius: '10px',
                boxShadow:
                  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
              }}
            />
          </CardActionArea>
          <CardContent sx={{ padding: 0 }}>
            <Typography
              gutterBottom
              component="h4"
              margin="0"
              sx={{ fontSize: '1em' }}
            >
              Seul sur mars
            </Typography>
          </CardContent>
          <Box
            width="100%"
            position="absolute"
            bottom="25px"
            height="25px"
            borderRadius="0 0 10px 10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#0000009e' }}
          >
            <OrangeRating
              readOnly
              emptyIcon={
                <StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />
              }
            />
          </Box>
        </Card>
      </Stack>
    </Stack>
  );
};

export default ProfilSuggestedNotes;
