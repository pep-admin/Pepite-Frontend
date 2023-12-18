// Import des libs externes
import React from 'react';
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
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes étoile vide
import { GoldNuggetIcon, YellowRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { convertRating } from '@utils/functions/convertRating';
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';
import ProfilNoGold from './ProfilNoGold';

const ProfilSuggestedNotes = ({
  goldenMovies,
  setGoldenMovies,
  userInfos,
  chosenUser,
}) => {
  const [showGoldenMovie, setShowGoldenMovie] = useState(false);
  const [goldenMovieInfos, setGoldenMovieInfos] = useState(null);

  const { displayType } = useData();
  const { id } = useParams();

  const fetchAllGoldNuggetsOfUser = async () => {
    const response = await getAllGoldNuggetsOfUser(displayType, id);
    setGoldenMovies(response);
  };

  useEffect(() => {
    fetchAllGoldNuggetsOfUser();
  }, [displayType]);

  return (
    <>
      {showGoldenMovie ? (
        <CriticAdvicesModal
          showPoster={showGoldenMovie}
          setShowPoster={setShowGoldenMovie}
          infos={goldenMovieInfos}
          from={'suggested'}
        />
      ) : null}
      <Stack direction="column" height="100%">
        <Stack
          direction="row"
          height="25px"
          justifyContent="space-between"
          alignItems="center"
          padding="0 10px"
        >
          <Typography variant="body2" component="p" fontWeight="bold">
            {'Dernières pépites'}
          </Typography>
          <Typography variant="body2" component="p" fontWeight="bold">
            {'Voir +'}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          height="calc(100% - 25.8px)"
          justifyContent="flex-start"
          padding="6px 6px 0 6px"
          gap="10px"
          sx={{
            overflowX: 'scroll',
          }}
        >
          {!goldenMovies.length ? (
            <ProfilNoGold userInfos={userInfos} chosenUser={chosenUser} />
          ) : (
            goldenMovies.map(movie => {
              return (
                <React.Fragment key={movie.id}>
                  <Card
                    sx={{
                      height: '100%',
                      width: 95,
                      flexShrink: 0,
                      boxShadow: 'none',
                      position: 'relative',
                    }}
                  >
                    <CardActionArea
                      sx={{ height: 'calc(100% - 23px)' }}
                      onClick={() => {
                        setGoldenMovieInfos(movie);
                        setShowGoldenMovie(true);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="100%"
                        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={
                          displayType === 'movie'
                            ? `${movie.title}`
                            : `${movie.name}`
                        }
                        sx={{
                          borderRadius: '10px',
                          boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
                        }}
                      />
                    </CardActionArea>
                    <CardContent
                      sx={{
                        height: '23px',
                        width: '100%',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        gutterBottom
                        component="h4"
                        margin="0"
                        paddingLeft="8px"
                        maxWidth="100%"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        sx={{ fontSize: '1em' }}
                      >
                        {displayType === 'movie' ? movie.title : movie.name}
                      </Typography>
                    </CardContent>
                    <Box
                      width="100%"
                      position="absolute"
                      bottom="23px"
                      height="23px"
                      borderRadius="0 0 10px 10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: '#0000009e' }}
                    >
                      <YellowRating
                        name="half-rating-read"
                        value={convertRating(movie.vote_average)}
                        precision={0.1}
                        readOnly
                        emptyIcon={
                          <StarIcon
                            sx={{ color: '#E1E1E1', fontSize: '1.05em' }}
                          />
                        }
                        sx={{ marginRight: '5px', fontSize: '0.9em' }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        fontWeight="bold"
                        sx={{ color: '#faaf00' }}
                      >
                        {convertRating(movie.vote_average)}
                      </Typography>
                    </Box>
                    <Box
                      width="20px"
                      height="20px"
                      position="absolute"
                      top="2px"
                      right="2px"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="1px solid #f29e50"
                      sx={{ backgroundColor: '#fff' }}
                    >
                      <GoldNuggetIcon
                        sx={{
                          fontSize: '1em',
                          position: 'relative',
                          top: '0.2px',
                          right: '0.1px',
                        }}
                      />
                    </Box>
                  </Card>
                  <Divider variant="middle" flexItem orientation="vertical" />
                </React.Fragment>
              );
            })
          )}
        </Stack>
      </Stack>
    </>
  );
};

ProfilSuggestedNotes.propTypes = {
  goldenMovies: PropTypes.array.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
};

export default ProfilSuggestedNotes;
