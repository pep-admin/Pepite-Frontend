// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  Button,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des composants customisés
import { Item } from '@utils/styledComponent';

// Import des composants internes
import CriticAdvicesHeader from './CriticAdvicesHeader';
import CriticAdvicesContent from './CriticAdvicesContent';
import CriticAdvicesReview from './CriticAdvicesReview';
import CriticAdvicesFooter from './CriticAdvicesFooter';

const CriticAdvicesComponent = ({ type, chosenMovie }) => {
  const [displayOverwiew, setDisplayOverview] = useState(false); // Affichage du synopsis
  const [newRating, setNewRating] = useState(null); // Note attribuée par l'utilisateur
  const [newCriticText, setNewCriticText] = useState(''); // Nouveau texte de critique

  const [displayRatings, setDisplayRatings] = useState(null);
  const ratingsHeaderRef = useRef(null);

  const submitNewReview = () => {
    const newReview = {
      rating: newRating,
      text: newCriticText,
    };

    console.log(newReview);
  };

  useEffect(() => {
    console.log('la ref', ratingsHeaderRef.current);
  }, []);

  return (
    <Item margintop="6px">
      <Stack height="100%">
        <CriticAdvicesHeader
          type={type}
          ratingsHeaderRef={ratingsHeaderRef}
          displayRatings={displayRatings}
          setDisplayRatings={setDisplayRatings}
          newRating={newRating}
          setNewRating={setNewRating}
        />
        <Divider />
        <Stack padding="7px 10px">
          <Card
            sx={{
              height: '100%',
              width: 'auto',
              boxShadow: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'visible',
            }}
          >
            <Box
              marginBottom={displayOverwiew ? '7px' : '0'}
              display="flex"
              flexGrow="1"
              sx={{ transition: 'margin-bottom 0.5s ease-in-out' }}
            >
              <CardActionArea sx={{ height: '100px', width: 'auto' }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={
                    chosenMovie !== null
                      ? `https://image.tmdb.org/t/p/w500/${chosenMovie[0].poster_path}`
                      : 'http://127.0.0.1:5173/images/mars.jpg'
                  }
                  alt="green iguana"
                  sx={{
                    objectFit: 'contain',
                    borderRadius: '10px',
                  }}
                />
              </CardActionArea>
              <CriticAdvicesContent
                type={type}
                chosenMovie={chosenMovie}
                displayOverview={displayOverwiew}
                setDisplayOverview={setDisplayOverview}
              />
            </Box>
            <Stack
              direction="row"
              flexGrow="1"
              marginBottom={type === 'new-critic' ? '15px' : '7px'}
              sx={{
                maxHeight: displayOverwiew ? '60px' : '0px',
                overflowY: 'scroll',
                transition: 'max-height 0.5s ease-in-out',
              }}
            >
              <Divider
                orientation="vertical"
                sx={{ borderColor: 'primary.dark' }}
              />
              <Typography
                variant="body2"
                component="p"
                align="left"
                paddingLeft="10px"
              >
                {chosenMovie && type === 'new-critic'
                  ? chosenMovie[0].overview
                  : "L'astronaute Roy McBride s'aventure jusqu'aux confins du système solaire à la recherche de son père disparu et pour résoudre un mystère qui menace la survie de notre planète."}
              </Typography>
            </Stack>
            <CriticAdvicesReview
              type={type}
              setNewCriticText={setNewCriticText}
            />
            {type === 'new-critic' ? (
              <Stack direction="row" flexBasis="100%" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    maxWidth: '100px',
                    maxHeight: '30px',
                    backgroundColor: newRating === null ? '#a09f9f' : '#F29E50',
                    opacity: newRating === null ? '0.3' : '1',
                    cursor: newRating === null ? 'help' : 'pointer',
                    '&:hover': {
                      backgroundColor: '#a09f9f',
                    },
                  }}
                  onClick={() => {
                    if (newRating === null)
                      setDisplayRatings(ratingsHeaderRef.current);
                    else submitNewReview();
                  }}
                >
                  {'Publier'}
                </Button>
              </Stack>
            ) : null}
          </Card>
        </Stack>
        {type === 'old-critic' ? <CriticAdvicesFooter /> : null}
      </Stack>
    </Item>
  );
};

CriticAdvicesComponent.propTypes = {
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
};

export default CriticAdvicesComponent;
