import {
  Stack,
  Typography,
  Divider,
} from '@mui/material';

const SwipeContent = ({ movieDetail, movies, currentMovieIndex}) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem sx={{ margin: '0 12px' }} />}
      sx={{
        height: '100%'
      }}
    >
      <Stack width="calc(35% - 10px)" spacing={1} sx={{ overflowY: 'scroll' }} >
        {movieDetail.length > 0
          ? movieDetail.map((detail) => {
              return (
                <Stack key={detail.label} flexDirection='row' flexWrap='wrap' columnGap='5px'>
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
                  <Typography
                    align="left"
                    variant="body2"
                  >
                    {detail.value}
                  </Typography>
                </Stack>   
              );
            })
          : null}
      </Stack>
      <Stack width='calc(65% - 10px)' sx={{ flex: 1, overflowY: 'scroll' }}>
        <Typography variant="body2" align="left">
          {movies[currentMovieIndex].overview}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SwipeContent;