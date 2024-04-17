// Import des libs externes
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import { Item } from '@utils/components/styledComponent';
import MainItemList from '@utils/components/MainItemList';

// Import des requêtes
import { getCriticsOfUser } from '@utils/request/critics/getCritics';
import { getWantedMoviesRequest } from '@utils/request/list/getWantedMoviesRequest';
import { getWatchedMoviesRequest } from '@utils/request/list/getWatchedMoviesRequest';

const ListMoviesSeries = ({ movieOrSerie, alignment }) => {
  const { id } = useParams();

  const [wantedMovies, setWantedMovies] = useState([]); // Les films que l'utilisateur a choisi de voir
  const [watchedMovies, setWatchedMovies] = useState([]); // Les films que l'utilisateur a déjà vu
  const [ratedMovies, setRatedMovies] = useState([]); // Les films que l'utilisateur a noté

  const [wantedSeries, setWantedSeries] = useState([]); // Les séries que l'utilisateur a choisi de voir
  const [watchedSeries, setWatchedSeries] = useState([]); // Les séries que l'utilisateur a déjà vu
  const [ratedSeries, setRatedSeries] = useState([]); // Les séries que l'utilisateur a noté

  const listArray =
    alignment === 'À voir'
      ? movieOrSerie === 'movie'
        ? wantedMovies
        : wantedSeries
      : alignment === 'À noter'
      ? movieOrSerie === 'movie'
        ? watchedMovies
        : watchedSeries
      : alignment === 'Notés'
      ? movieOrSerie === 'movie'
        ? ratedMovies
        : ratedSeries
      : [];

  const getWanted = async () => {
    const wantedMov = await getWantedMoviesRequest(id, 'movie');
    const wantedSer = await getWantedMoviesRequest(id, 'tv');
    setWantedMovies(wantedMov);
    setWantedSeries(wantedSer);
  };

  const getWatched = async () => {
    const watchedMov = await getWatchedMoviesRequest(id, 'movie');
    const watchedSer = await getWatchedMoviesRequest(id, 'tv');
    setWatchedMovies(watchedMov);
    setWatchedSeries(watchedSer);
  };

  const getRated = async () => {
    const ratedMov = await getCriticsOfUser(id, 'movie', 1, 'all');
    const ratedSer = await getCriticsOfUser(id, 'tv', 1, 'all');
    console.log('les films notés', ratedMov);

    setRatedMovies(ratedMov);
    setRatedSeries(ratedSer);
  };

  useEffect(() => {
    if (alignment === 'À voir') {
      getWanted();
    } else if (alignment === 'À noter') {
      getWatched();
    } else {
      getRated();
    }
  }, [alignment]);

  return (
    <Item overflow="scroll" maxheight="250px" flexgrow="1" marginbottom="10px">
      <Stack
        direction="row"
        height="27px"
        alignItems="center"
        justifyContent="space-between"
        padding="0 10px"
      >
        <Stack direction="row" alignItems="center" columnGap="5px">
          <Typography
            variant="body2"
            component="p"
            lineHeight="normal"
            fontWeight="600"
          >
            {movieOrSerie === 'movie' ? 'Films' : 'Séries'}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            bgcolor="#E7AE1A"
            height="15px"
            width="15px"
            borderRadius="50%"
          >
            <Typography component="span" fontSize="0.8em" fontWeight="600">
              {listArray.length}
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="body2"
          component="p"
          fontWeight="600"
          sx={{
            cursor: 'pointer',
          }}
        >
          {(movieOrSerie === 'movie' && wantedMovies.length >= 1) ||
          (movieOrSerie === 'tv' && wantedSeries.length >= 1)
            ? 'Voir tous'
            : null}
        </Typography>
      </Stack>
      <Divider />
      {listArray.length ? (
        listArray.map((movie, index) => {
          return (
            <MainItemList
              key={movie.movie_id || movie.serie_id}
              movieOrSerie={movieOrSerie}
              type={
                alignment === 'À voir'
                  ? 'wanted-movies'
                  : alignment === 'À noter'
                  ? 'watched-movies'
                  : 'rated-movies'
              }
              data={movie}
              getRequest={
                alignment === 'À voir'
                  ? getWanted
                  : alignment === 'À noter'
                  ? getWatched
                  : getRated
              }
              getRequest2={null}
              isLast={index === listArray.length - 1}
            />
          );
        })
      ) : (
        <Stack direction="column">
          <Typography variant="body2" padding="10px 0">
            <>
              <span style={{ fontWeight: 'bold' }}>
                {`Aucun${movieOrSerie === 'movie' ? ' film' : 'e série'}
                  ${
                    alignment === 'À voir'
                      ? 'à voir'
                      : alignment === 'À noter'
                      ? 'à noter'
                      : movieOrSerie === 'movie'
                      ? 'noté'
                      : 'notée'
                  }`}
              </span>
              {' pour le moment.'}
            </>
          </Typography>
        </Stack>
      )}
    </Item>
  );
};

ListMoviesSeries.propTypes = {
  movieOrSerie: PropTypes.string.isRequired,
  alignment: PropTypes.string,
};

export default ListMoviesSeries;
