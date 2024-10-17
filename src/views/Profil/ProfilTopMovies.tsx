import { Box, Stack, Typography } from '@mui/material';
import TopMovieCard from './TopMovieCard';

const ProfilTopMovies = () => {
  return (
    <Stack
      spacing={3}
      padding='0 0 40px 0'
    >
      <Stack>
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`top 3 - films et séries`}
        </Typography>
      </Stack>
      <Stack 
        direction='row'
        justifyContent='center'  
      >
        <Stack 
          spacing={2}
          width='30%' 
          justifyContent='flex-end' 
          alignItems='center'
        >
          <TopMovieCard />
          <Stack
            width='100%'
            justifyContent='center'
            alignItems='center'
            sx={{
              height: '30px',
              color: '#011212',
              backgroundColor: '#ADADAD',
              outline: '1px solid #2E2E2E'
            }}
          >
            <Typography
              fontFamily='Pagrati Narrow, sans-serif'
              fontWeight='bold'
              fontSize='1.1em'
            >
              {'2'}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          width='30%' 
          justifyContent='flex-end' 
          alignItems='center'
        >
          <TopMovieCard />
          <Stack
            width='100%'
            justifyContent='center'
            alignItems='center'
            sx={{
              height: '40px',
              color: '#011212',
              backgroundColor: '#E7AE1A',
              outline: '1px solid #2E2E2E',
              transform: 'scaleX(1)'
            }}
          >
            <Typography
              fontFamily='Pagrati Narrow, sans-serif'
              fontWeight='bold'
              fontSize='1.2em'
            >
              {'1'}
            </Typography>
          </Stack>
        </Stack>
        <Stack 
          spacing={2}
          width='30%' 
          justifyContent='flex-end' 
          alignItems='center'
        >
          <TopMovieCard />
          <Stack
            width='100%'
            justifyContent='center'
            alignItems='center'
            sx={{
              height: '20px',
              color: '#011212',
              backgroundColor: '#895E1C',
              outline: '1px solid #2E2E2E'
            }}
          >
            <Typography
              fontFamily='Pagrati Narrow, sans-serif'
              fontWeight='bold'
              fontSize='1em'
            >
              {'3'}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilTopMovies;