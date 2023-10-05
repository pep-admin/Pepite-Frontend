import { Stack, Typography, Divider } from '@mui/material';

const SwipeContent = ({ movieDetail, movies, currentMovieIndex }) => {
  return (
    <Stack
      direction="row"
      divider={
        <Divider orientation="vertical" flexItem sx={{ margin: '0 10px' }} />
      }
      sx={{
        height: '100%',
      }}
    >
      <Stack width="calc(35% - 10px)" spacing={1} sx={{ overflowY: 'scroll' }}>
        {movieDetail.length > 0
          ? movieDetail.map(detail => {
              return (
                <Stack
                  key={detail.label}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Typography
                    align="left"
                    variant="body2"
                    sx={{
                      color: '#0E6666',
                      fontWeight: 'bold',
                    }}
                  >
                    {detail.label + ':'}
                  </Typography>
                  <Typography variant="body2">
                    {detail.value}
                  </Typography>
                </Stack>
              );
            })
          : null}
      </Stack>
      <Stack width="calc(65% - 10px)" sx={{ overflowY: 'scroll' }}>
        <Typography variant="body2" align="left">
          {movies[currentMovieIndex].overview === ''
            ? "Désolé, il n'y a pas de synopsis disponible pour ce film..."
            : movies[currentMovieIndex].overview}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SwipeContent;
