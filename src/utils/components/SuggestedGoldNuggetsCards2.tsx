// Import des libs externes
import { Badge, Stack, Typography } from '@mui/material';

// Import des icônes
import ColoredRating from './ColoredRating';

// Import des fonctions utilitaires
import { convertRating } from '@utils/functions/convertRating';

const SuggestedGoldNuggetsCards2 = ({
  page,
  movie,
  setGoldenMovieInfos,
  setShowGoldenMovie
}) => {  

  // Récupère le nom du film ou de la série
  const getMovieTitle = () => {
    if('title' in movie) {
      return `${movie.title}`;
    } else {
      return `${movie.name}`;
    }
  }

  return (
    <Badge
      badgeContent={movie.users?.length} 
      color='secondary'
      sx={{
        '& .MuiBadge-badge': {
          right: 0,
          top: 10,
          border: `2px solid`,
          padding: '0 4px',
        },
      }}
    >
      <Stack
        height='120px'
        width='90px'
        marginBottom='9px'
        flexShrink='0'
        justifyContent='center'
        alignItems='center'
        sx={{
          position: 'relative', 
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '7px',
          boxShadow: '0px 3px 3.7px rgba(0, 0, 0, 0.30)',
          '&::before': { 
            content: '""', 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(14, 102, 102, 0.55)', 
            zIndex: 1, 
            borderRadius: '7px',
          },
          '& > *': { 
            position: 'absolute',
            zIndex: 2,
          },
        }}
        onClick={() => {
          setGoldenMovieInfos({
            ...movie,
            users: movie.users,
          });
          setShowGoldenMovie(true);
        }}
      >
        <Typography 
          variant='body2' 
          align='center' 
          padding='10px'
          color='primary'
          fontWeight='300'
          lineHeight='1.2'
        >
          {getMovieTitle()}
        </Typography>
        <Stack 
          direction='row' 
          justifyContent='center'
          alignItems='center'
          height='20px'
          width='100%'
          bottom='0' 
          bgcolor='rgba(1, 18, 18, 0.49)'
          sx={{
            borderRadius: '0 0 7px 7px'
          }}
        >
          <ColoredRating
            color='#E7AE1A'
            emptyColor='#fff'
            value={convertRating(movie.vote_average)}
            precision={0.1}
            readOnly={true}
            sx={{
              fontSize: '0.8em',
              alignItems: 'center',
              left: '-3px',
              bottom: '0.5px'
            }}
          />
          <Typography fontSize='0.7em' color='secondary' fontWeight='600'>
            {`${convertRating(movie.vote_average)}`}
          </Typography>
        </Stack>
      </Stack>
    </Badge>
  );
};

export default SuggestedGoldNuggetsCards2;