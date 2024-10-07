import { Avatar, Box, Stack, Typography } from '@mui/material';
import { translateJob } from '@utils/data/jobsTranslations';
import React from 'react';

const FilmCastingCard = ({ peopleType, people }) => {

  // console.log('le casting =>', people);
  
  return (
    <Stack 
      alignItems='center' 
      width='80px'  
      flexShrink={0}  
    >
      <Avatar
        variant="circular"
        alt={`Photo de ${people.name}`}
        src={people.profile_path ? `https://image.tmdb.org/t/p/w185${people.profile_path}` : undefined}
        sx={{
          height: '65px',
          width: '65px',
          border: '1px solid #040404',
          fontSize: '1.3em', 
          backgroundColor: people.profile_path ? 'inherit' : '#0c6666',
          color: '#040404'
        }}
      >
        {/* Si pas de photo de profil */}
        {!people.profile_path && people.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) // Limiter à 2 lettres
        }
      </Avatar>
      <Stack 
        alignItems='center'
        marginTop='10px'
      >
        <Typography
          align='center'
          fontFamily='Pragati Narrow, sans-serif'
          fontSize='0.9em'
          lineHeight='1.2'
        >
          {`${people.name}`}
        </Typography>
        <Box marginTop='3px' >
          {peopleType === 'crew' ?
            <Typography 
              component='p' 
              align='center'
              fontSize='0.8em'
              fontFamily='Pragati Narrow, sans-serif'
              color='primary.light'
            >
              {translateJob(people.job)}
            </Typography>
            : 
            <Typography
              align='center'
              fontSize='0.8em'
              fontFamily='Pragati Narrow, sans-serif'
              color='primary.light'
            >
              {`${people.character}`}
            </Typography>
          }
        </Box>
      </Stack>
    </Stack>
  );
};

export default FilmCastingCard;