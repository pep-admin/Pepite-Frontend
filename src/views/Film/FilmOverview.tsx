import { Stack, Typography, Button, Container } from '@mui/material';

const FilmOverview = ({ movie }) => {

  return (
    <Container
      sx={{
        margin: '36px 0',
        paddingLeft: '5vw',
        paddingRight: '5vw'
      }}
    >
      <Stack spacing={6}>
        <Typography
          component='p'
          align='justify'
          color='text.primary'
          fontWeight='200'
          lineHeight='2'
        >
          {`${movie.overview}`}
        </Typography>
        <Button
          sx={{
            height: '33px',
            width: '120px',
            backgroundColor: '#0B2C2C',
            color: '#f1f1f1',
            textTransform: 'initial',
            fontSize: '0.9em',
            fontWeight: '400',
            padding: '1px 0 0 0'
          }}
        >
          {'Bande-annonce'}
        </Button>
      </Stack>
    </Container>
  );
};

export default FilmOverview;