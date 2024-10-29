import { Divider, Rating, Slider, Stack, Typography, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MovieInterestBtn from '@utils/components/Buttons/MovieInterestBtn';
import { useEffect } from 'react';


const RatingStars = ({ 
  ratingSectionIndex, 
  isGoldNugget, 
  setIsGoldNugget, 
  isTurnip, 
  setIsTurnip, 
  movieRating, 
  setMovieRating 
}) => {

  const theme = useTheme();

  const handleSliderChange = (_: Event, newValue: number) => {    
    setMovieRating(newValue as number);
  };

  const handleGoldOrTurnip = (btnType) => {
    if(btnType === 'gold') {
      setIsGoldNugget(!isGoldNugget);
      setIsTurnip(false);
    } else {
      setIsTurnip(!isTurnip);
      setIsGoldNugget(false);
    }

    setMovieRating(null);
  };

  useEffect(() => {
    console.log('pépite ?', isGoldNugget);
    
  }, [isGoldNugget]);

  return (
    <Stack
      spacing={5}
      padding='30px 0 0 0'
    >
      <Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography
            component='h2'
            color='text.primary'
            fontSize='1.15em'
            fontWeight='400'
            textTransform='uppercase'
          >
            {'VOTRE NOTE'}
          </Typography>
          <Typography
            component='span'
            fontSize='1em'
            fontWeight='200'
            color={ ratingSectionIndex === 0 ? 
              'secondary'
              : theme.palette.primary.light
            }
          >
            { ratingSectionIndex === 0 ?
              '* obligatoire'
              : '* facultatif'
            }
          </Typography>
        </Stack>
        <Typography
          component='h2'
          color='gray'
          fontSize='1em'
          fontWeight='400'
          lineHeight='1'
          marginTop='4px'
        >
          {'Pépite ou navet'}
        </Typography>
      </Stack>
      <Stack direction='row' spacing={2} justifyContent='space-evenly' alignItems='center'>
        <MovieInterestBtn 
          btnFrom={'rating'} 
          btnType={'gold'} 
          value={null} 
          disabled={isTurnip}
          handleBtn={handleGoldOrTurnip} 
        />
        <MovieInterestBtn 
          btnFrom={'rating'} 
          btnType={'turnip'} 
          value={null} 
          disabled={isGoldNugget}
          handleBtn={handleGoldOrTurnip} 
        />
      </Stack>
      <Stack spacing={5} >
        <Stack>
          <Typography
            component='h2'
            color='gray'
            fontSize='1em'
            fontWeight='400'
            lineHeight='1'
            marginTop='4px'
          >
            {'Note de 0 à 5'}
          </Typography>
        </Stack>
        <Stack 
          spacing={2} 
          alignItems='center'
          sx={{
            filter: isGoldNugget || isTurnip ? 'grayscale(1)' : 'none'
          }}  
        >
          <Stack 
            width='75%' 
            direction='row' 
            justifyContent='center' 
            alignItems='center'
            position='relative'
          >
            <Rating
              name="half-rating-read"
              value={movieRating}
              precision={0.5}
              readOnly
              sx={{
                '& .MuiRating-icon': {
                  fontSize: '2em',
                },
              }}
              icon={
                <StarIcon sx={{ color: '#E7AE1A' }} fontSize="inherit" />
              }
              emptyIcon={
                <StarIcon sx={{ color: '#627171' }} fontSize="inherit" />
              }
            />
            <Typography
              color="#E7AE1A"
              whiteSpace='nowrap'
              position='absolute'
              top='6px'
              right='-9px'
            >
              {`${movieRating === null ? '?' : movieRating} / 5`}
            </Typography>
          </Stack>
          <Stack
            width='75%' 
            direction='row' 
            justifyContent='center' 
            alignItems='center'
          >
            <Slider
              aria-label="Note"
              // getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              value={movieRating}
              step={0.5}
              min={0}
              max={5}
              onChange={handleSliderChange}
              disabled={isGoldNugget || isTurnip}
              sx={{
                color: '#627171',
                width: 'calc(2em * 5)',
                '& .MuiSlider-track': {
                  color: '#E7AE1A',
                },
                '& .MuiSlider-thumb': {
                  color: '#E7AE1A',
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: '#282828', marginTop: '30px' }} />
    </Stack>
  );
};

export default RatingStars;