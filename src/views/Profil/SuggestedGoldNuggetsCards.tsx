// Import des libs externes
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import { YellowRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';
import { useData } from '@hooks/DataContext';
import { convertRating } from '@utils/functions/convertRating';

const SuggestedGoldNuggetsCards = ({
  page,
  movie,
  isLast,
  setGoldenMovieInfos,
  setShowGoldenMovie,
}) => {
  const { displayType } = useData();

  return (
    <>
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
            setGoldenMovieInfos({
              ...movie,
              users: movie.users,
            });
            setShowGoldenMovie(true);
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={displayType === 'movie' ? `${movie.title}` : `${movie.name}`}
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
              <StarIcon sx={{ color: '#E1E1E1', fontSize: '1.05em' }} />
            }
            sx={{ marginRight: '5px', fontSize: '0.9em' }}
          />
          <Typography
            variant="body2"
            component="span"
            fontWeight="bold"
            sx={{ color: '#FFDA1B' }}
          >
            {convertRating(movie.vote_average)}
          </Typography>
        </Box>
        <Box
          width="23px"
          height="23px"
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
          <img
            src="/images/gold_right_top_outlined.svg"
            alt=""
            style={{
              position: 'relative',
              top: '0.2px',
            }}
          />
          {page !== 'profil' && movie?.users.length > 1 ? (
            <Typography
              variant="body2"
              fontWeight="bold"
              position="absolute"
              color="#052525"
            >
              {`${movie.users.length}`}
            </Typography>
          ) : null}
        </Box>
      </Card>
      {!isLast ? (
        <Divider variant="middle" flexItem orientation="vertical" />
      ) : null}
    </>
  );
};

SuggestedGoldNuggetsCards.propTypes = {
  page: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  setGoldenMovieInfos: PropTypes.func.isRequired,
  setShowGoldenMovie: PropTypes.func.isRequired,
};

export default SuggestedGoldNuggetsCards;
