// Import des libs externes
import { Box, CardActionArea, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { TurnipIcon } from '@utils/components/styledComponent';

const CriticAdvicesPoster = ({
  chosenMovie,
  type,
  setShowPoster,
  isModify,
  infos,
  isGoldNugget,
  isTurnip,
}) => {
  return (
    <CardActionArea
      sx={{
        position: 'relative',
        height: '158px',
        width: '105px',
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'visible',
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image={
          chosenMovie !== null
            ? `https://image.tmdb.org/t/p/w500/${chosenMovie.poster_path}`
            : `https://image.tmdb.org/t/p/w500/${infos.poster_path}`
        }
        alt={
          chosenMovie !== null
            ? `Affiche de ${chosenMovie.title}`
            : `Affiche de ${infos.title}`
        }
        sx={{
          borderRadius: '5px',
          boxShadow: '5px 4px 0px #e9e9e9',
        }}
        onClick={type === 'old-critic' ? () => setShowPoster(true) : null}
      />
      {((type === 'old-critic' || type === 'old-advice') &&
        !isModify &&
        (infos?.is_gold_nugget || infos?.is_turnip)) ||
      ((type === 'new-critic' || type === 'new-advice' || isModify) &&
        (isGoldNugget || isTurnip)) ? (
        <Box
          width="25px"
          height="25px"
          position="absolute"
          top="3px"
          right="3px"
          borderRadius="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: 'rgba(244, 244, 244, 0.65)' }}
        >
          {(infos?.is_gold_nugget && !isModify) ||
          (isGoldNugget && !isTurnip) ? (
            <img
              src="/images/gold_right_top_outlined.svg"
              alt="pépite d'or"
              style={{
                position: 'relative',
                top: '0.2px',
              }}
            />
          ) : (infos?.is_turnip && !isModify) || (!isGoldNugget && isTurnip) ? (
            <TurnipIcon
              sx={{
                fontSize: '1.2em',
                position: 'relative',
                top: '0.2px',
                right: '0.1px',
              }}
            />
          ) : null}
        </Box>
      ) : null}
    </CardActionArea>
  );
};

CriticAdvicesPoster.propTypes = {
  chosenMovie: PropTypes.object,
  type: PropTypes.string.isRequired,
  setShowPoster: PropTypes.func.isRequired,
  isModify: PropTypes.bool.isRequired,
  infos: PropTypes.object,
  isGoldNugget: PropTypes.bool.isRequired,
  isTurnip: PropTypes.bool.isRequired,
};

export default CriticAdvicesPoster;
