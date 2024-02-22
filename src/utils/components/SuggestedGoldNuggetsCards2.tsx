import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { YellowRating } from './styledComponent';
import ColoredRating from './ColoredRating';
import { convertRating } from '@utils/functions/convertRating';
import { useData } from '@hooks/DataContext';

const SuggestedGoldNuggetsCards2 = ({
  page,
  movie,
  isLast,
  setGoldenMovieInfos,
  setShowGoldenMovie
}) => {

  const { displayType } = useData();

  const getMovieTitle = () => {
    if('title' in movie) {
      return `${movie.title}`;
    } else {
      return `${movie.name}`;
    }
  }

  return (
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
            position: 'relative',
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
      </Stack>
  );
};

export default SuggestedGoldNuggetsCards2;