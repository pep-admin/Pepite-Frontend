// Import des libs externes
import { Stack, Typography, CardContent, Divider } from '@mui/material';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

// Import des composants customisés
import IsNew from '@utils/components/IsNew';
import ColoredRating from '@utils/components/ColoredRating';

const CriticAdvicesContent = ({ type, chosenMovie, infos }) => {
  // Information sur la critique : Film ou série
  const movieOrSeries = useMemo(() => {
    if (chosenMovie) return 'release_date' in chosenMovie ? 'Film' : 'Série';
    if (infos) return 'release_date' in infos ? 'Film' : 'Série';
    return null;
  }, [chosenMovie, infos]);

  // Informations sur les genres du film ou série
  const genres = useMemo(() => {
    const item = chosenMovie || infos;
    return item ? item.genres.map(genre => genre.name).join(', ') : '';
  }, [chosenMovie, infos]);

  // Informations sur l'année de sortie du film ou du premier épisode de la série
  const releaseYear = useMemo(() => {
    const date =
      (chosenMovie || infos)?.release_date ||
      (chosenMovie || infos)?.first_air_date;
    return date ? date.split('-')[0] : '';
  }, [chosenMovie, infos]);

  // Informations sur le titre du film ou de la série
  const title = useMemo(() => {
    if (chosenMovie && (type === 'new-critic' || type === 'new-advice'))
      return chosenMovie.title || chosenMovie.name;
    if (infos && (type === 'old-critic' || type === 'old-advice'))
      return infos.title || infos.name;
    return '';
  }, [chosenMovie, infos, type]);

  // Note du film ou de la série
  const originalScore = useMemo(() => {
    if (type === 'new-critic' || type === 'new-advice') {
      return chosenMovie ? chosenMovie.vote_average / 2 : 0;
    }
    return infos ? infos.vote_average / 2 : 0;
  }, [type, chosenMovie, infos]);

  const overview = useMemo(() => {
    if (type === 'new-critic' || type === 'new-advice') {
      return chosenMovie.overview;
    } else {
      return infos.overview;
    }
  }, [infos, chosenMovie]);

  // Arrondi à un chiffre après la virgule
  const roundedScore = parseFloat(originalScore.toFixed(1));

  return (
    <CardContent
      sx={{
        width: 'calc(100% - 90px)',
        padding: '0 0 0 12px !important',
        height: '140px',
        overflow: 'hidden',
      }}
    >
      <Stack height="100%">
        <Stack
          height="100%"
          sx={{
            overflowY: 'scroll',
          }}
        >
          <Stack direction="column" columnGap="10px">
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              columnGap="10px"
            >
              <Typography
                fontSize="1.1em"
                fontWeight="700"
                component="h5"
                textAlign="left"
                color="primary.dark"
                lineHeight="1.4"
                sx={{
                  maxWidth: '190px',
                }}
              >
                {title}
              </Typography>
              {type === 'old-critic' || type === 'old-advice' ? (
                <IsNew
                  from={'critic'}
                  created_at={
                    type == 'old-critic' ? infos.critic_date : infos.advice_date
                  }
                />
              ) : null}
            </Stack>
            <Stack direction="row" columnGap="5px">
              <ColoredRating
                color="#FCD717"
                emptyColor="#969696"
                value={roundedScore}
                readOnly={true}
                precision={0.1}
                sx={{
                  fontSize: '1.1em',
                  left: '0px',
                }}
              />
              <Typography variant="body2" fontWeight="bold" component="p">
                {`${roundedScore}` + ' / 5'}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            bgcolor="#f2f2f2"
            marginTop="6px"
            flexGrow="1"
            sx={{
              borderRadius: '7px',
            }}
          >
            <Stack
              direction="row"
              columnGap="7px"
              justifyContent="space-between"
              padding="5px 10px"
            >
              <Typography variant="body2" fontWeight="400" color="#1D5F5F">
                {movieOrSeries}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: '#1D5F5F' }}
              />
              <Typography
                variant="body2"
                fontWeight="400"
                color="#1D5F5F"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {genres}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: '#1D5F5F' }}
              />
              <Typography variant="body2" fontWeight="400" color="#1D5F5F">
                {releaseYear}
              </Typography>
            </Stack>
            <Divider />
            <Stack>
              <Typography
                fontSize="0.85em"
                align="justify"
                padding="5px 10px"
                fontWeight="300"
                lineHeight="1.4"
              >
                {overview}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  );
};

CriticAdvicesContent.propTypes = {
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  infos: PropTypes.object,
};

export default CriticAdvicesContent;
