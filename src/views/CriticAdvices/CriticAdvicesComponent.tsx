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
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants customisés
import { Item } from '@utils/styledComponent';

// Import des composants internes
import CriticAdvicesHeader from './CriticAdvicesHeader';
import CriticAdvicesContent from './CriticAdvicesContent';
import CriticAdvicesReview from './CriticAdvicesReview';
import CriticAdvicesFooter from './CriticAdvicesFooter';
import { addNewCritic } from '@utils/request/critics/postCritic';
import { getAllCriticsOfUser } from '@utils/request/critics/getCritics';

const CriticAdvicesComponent = ({
  type,
  chosenMovie,
  setUserCritics,
  setNewCriticError,
  setNewCriticInfo,
  setNewCriticSuccess,
  criticInfos,
}) => {
  const [displayOverwiew, setDisplayOverview] = useState(false); // Affichage du synopsis
  const [newRating, setNewRating] = useState(null); // Note attribuée par l'utilisateur
  const [newCriticText, setNewCriticText] = useState(''); // Nouveau texte de critique
  const [isGoldNugget, setIsGoldNugget] = useState(false); // Pépite ou non

  const [displayRatings, setDisplayRatings] = useState(null);
  const ratingsHeaderRef = useRef(null);

  const { displayType, userId, setChosenMovieId, setChosenMovie } = useData();

  const submitNewReview = async () => {
    try {
      await addNewCritic(
        chosenMovie.id,
        displayType,
        newRating,
        newCriticText,
        isGoldNugget,
      );

      setNewCriticError({ error: false, message: null });
      setNewCriticInfo({ info: false, message: null });
      setNewCriticSuccess({
        success: true,
        message: 'Critique ajoutée avec succès !',
      });

      const newCriticsData = await getAllCriticsOfUser(userId);

      setUserCritics(newCriticsData);
    } catch (error) {
      if (error.response.status === 409) {
        setNewCriticInfo({ info: true, message: error.response.data });
        setNewCriticError({ error: false, message: null });
        setNewCriticSuccess({ success: false, message: null });
      } else {
        setNewCriticError({ error: true, message: error.response.data });
        setNewCriticInfo({ info: false, message: null });
        setNewCriticSuccess({ success: false, message: null });
      }
    }
    setChosenMovieId(null);
    setChosenMovie(null);
  };

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
          criticInfos={criticInfos}
          setUserCritics={setUserCritics}
          userId={userId}
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
              minHeight="120px"
              display="flex"
              flexGrow="1"
              sx={{ transition: 'margin-bottom 0.5s ease-in-out' }}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  width: 'auto',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <CardMedia
                  component="img"
                  height="120px"
                  image={
                    chosenMovie !== null
                      ? `https://image.tmdb.org/t/p/w500/${chosenMovie.poster_path}`
                      : `https://image.tmdb.org/t/p/w500/${criticInfos.poster_path}`
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
                isGoldNugget={isGoldNugget}
                setIsGoldNugget={setIsGoldNugget}
                criticInfos={criticInfos}
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
                  ? chosenMovie.overview
                  : criticInfos.overview}
              </Typography>
            </Stack>
            <CriticAdvicesReview
              type={type}
              setNewCriticText={setNewCriticText}
              criticInfos={criticInfos}
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
        {type === 'old-critic' ? (
          <CriticAdvicesFooter criticId={criticInfos.critic_id} />
        ) : null}
      </Stack>
    </Item>
  );
};

CriticAdvicesComponent.propTypes = {
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setUserCritics: PropTypes.func,
  setNewCriticError: PropTypes.func,
  setNewCriticInfo: PropTypes.func,
  setNewCriticSuccess: PropTypes.func,
  criticInfos: PropTypes.object,
};

export default CriticAdvicesComponent;
