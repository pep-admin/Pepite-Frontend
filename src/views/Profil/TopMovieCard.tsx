import { Stack, Typography } from '@mui/material';
import React from 'react';

const TopMovieCard = () => {
  return (
    <Stack
      width='75%'
      justifyContent='center'
      alignItems='center'
      sx={{
        aspectRatio: '2 / 3',
        backgroundColor: '#0B0B0B',
        outline: '1px solid #2E2E2E'
      }}
    >
      <Typography
        fontFamily='Pragati Narrow, sans-serif'
        fontSize='1.6em'
        color='#868686'
      >
        {'?'}
      </Typography>

    </Stack>
  );
};

export default TopMovieCard;