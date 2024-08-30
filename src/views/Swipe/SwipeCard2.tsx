import React, { FC, useState, useCallback } from 'react';
import { Card } from '@mui/material';
import { assetsBaseUrl } from '@utils/request/config';
import SwipeContent2 from './SwipeContent2';

interface SwipeCard2Props {
  movie: {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    is_rated: boolean;
    is_unwanted: boolean;
    is_wanted: boolean;
    is_watched: boolean;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  typeChosen: string;
  // position: string;
  openSnackbar: (message: string) => void;
  setOpenSnackbar: (open: boolean) => void;
}

const SwipeCard2 : FC<SwipeCard2Props> = React.memo(({ movie, typeChosen, openSnackbar, setOpenSnackbar }) => {

  const [showMovieInfos, setShowMovieInfos] = useState(false);

  return (
    <Card 
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // transform: position === 'center' ? 'scale(1)' : 'scale(0.9)',
        // opacity: position === 'center' ? 1 : 0.7,
        backgroundImage: `linear-gradient(
          to top,
          ${
            !showMovieInfos
              ? 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 1) 20%, rgba(1, 18, 18, 0.6) 50%, rgba(1, 18, 18, 0) 100%'
              : 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 0.97) 30%, rgba(1, 18, 18, 0.5) 85%, rgba(1, 18, 18, 0) 100%'
          }
        ), url(${
          movie.poster_path !== null
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : `${assetsBaseUrl}/images/no_poster.jpg`
        })`,
        backgroundColor: '#011212',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '0 6%',
        borderRadius: 0,
      }}
    >
      
      <SwipeContent2
        movie={movie}
        typeChosen={typeChosen}
        showMovieInfos={showMovieInfos}
        setShowMovieInfos={setShowMovieInfos}
        setOpenSnackbar={setOpenSnackbar}
      />
    </Card>
  );
});

export default SwipeCard2;
