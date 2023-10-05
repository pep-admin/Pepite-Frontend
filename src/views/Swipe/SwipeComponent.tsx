// Import des libs externes
import { styled, Paper, Container, Stack, Box } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import Header from '@utils/Header';
import SearchBar from '@utils/SearchBar';
import SwipeFilter from '@views/Swipe/SwipeFilter';
import SwipeMain from '@views/Swipe/SwipeMain';

type ItemProps = {
  customheight?: string;
};

// Item pour les conteneurs principaux
const Item = styled(Paper)<ItemProps>(({ theme, customheight }) => ({
  height: customheight || 'auto',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  borderRadius: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SwipeComponent = ({
  movies,
  movieDetail,
  generalRatings,
  error,
  loading,
  currentMovieIndex,
  setCurrentMovieIndex,
  setSwipeDirection,
}) => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 2%',
          backgroundColor: '#F4F4F4',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Stack spacing={1} sx={{ height: '100%', padding: '6px 0' }}>
          <SearchBar Item={Item} />
          <Box>
            <SwipeFilter Item={Item} />
          </Box>
          <Box sx={{ height: 'calc(100% - 92px)' }}>
            <SwipeMain
              Item={Item}
              movies={movies}
              movieDetail={movieDetail}
              generalRatings={generalRatings}
              error={error}
              loading={loading}
              currentMovieIndex={currentMovieIndex}
              setCurrentMovieIndex={setCurrentMovieIndex}
              setSwipeDirection={setSwipeDirection}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

SwipeComponent.propTypes = {
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.array.isRequired,
  generalRatings: PropTypes.number.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    error: PropTypes.object,
  }).isRequired,
  loading: PropTypes.shape({
    movies: PropTypes.bool,
    details: PropTypes.bool,
  }).isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

export default SwipeComponent;
