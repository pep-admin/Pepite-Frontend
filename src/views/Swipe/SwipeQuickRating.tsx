import { Popover, Box, Stack, Slider, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import QuickRatingBtns from './QuickRatingBtns';

const SwipeQuickRating = ({ 
  movies,
  setMovies,
  currentIndex,
  openPopover, 
  anchorRatingBtn, 
  closePopover, 
  handleActions,
  isGoldNugget,
  setIsGoldNugget,
  isTurnip,
  setIsTurnip,
  isRated,
  setIsRated
 }) => {  

  const [ratingValue, setRatingValue] = useState(movies[currentIndex].user_rating);
  console.log('la note du film =>', ratingValue);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setRatingValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (ratingValue < 0) {
      setRatingValue(0);
    } else if (ratingValue > 100) {
      setRatingValue(100);
    }
  };

  const handleBtnAction = (btnType: string) => {    
    const updatedMovies = [...movies];
    const currentMovie = updatedMovies[currentIndex];

    if(btnType === 'turnip') {
      setIsTurnip(!isTurnip);
      setIsGoldNugget(false);
      currentMovie.is_turnip = !isTurnip;
      currentMovie.is_gold_nugget = false;
      
    } else if(btnType === 'gold') {
      setIsGoldNugget(!isGoldNugget);
      setIsTurnip(false);
      currentMovie.is_turnip = false;
      currentMovie.is_gold_nugget = !isGoldNugget;

    } else if(btnType === 'validate') {
      console.log('pépite =>', isGoldNugget);
      console.log('navet =>', isTurnip);
      currentMovie.user_rating = ratingValue;
      handleActions('rated', ratingValue, isGoldNugget, isTurnip);
      setMovies(updatedMovies); // Mettre à jour l'état avec les modifications
      setIsRated(!isRated);
      closePopover();
    }
  };

  useEffect(() => {
    setRatingValue(movies[currentIndex].user_rating);
    setIsRated(movies[currentIndex].is_rated);
  }, [currentIndex]);

  return (
    <Popover
      open={openPopover}
      anchorEl={anchorRatingBtn}
      onClose={closePopover}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      elevation={0}
      sx={{
        transform: 'translate(0px, -20px)',
        '& .MuiPopover-paper': {
          background: 'none',
          overflow: 'visible',
        }
      }}
    >
      <Stack direction='row' height='180px' columnGap='20px' >
        <Stack justifyContent='center' rowGap='20px'>
          <Box
            sx={{
              filter: isGoldNugget ? 'grayscale(1)' : 'grayscale(0)'
            }}
          >
            <QuickRatingBtns 
              btnType={'turnip'} 
              handleBtnAction={handleBtnAction}
            />
          </Box>
          <Box
            sx={{
              filter: isTurnip ? 'grayscale(1)' : 'grayscale(0)'
            }}
          >
            <QuickRatingBtns 
              btnType={'gold'} 
              handleBtnAction={handleBtnAction}
            />
          </Box>
        </Stack>
        <Stack>
          <Box
            height='100%'
            width='92px'
            sx={{
              backgroundColor: '#1A1A1A',
              borderRadius: '15px',
              filter: isTurnip || isGoldNugget ? 'grayscale(1)' : 'grayscale(0)'
            }}
          >
            <Stack 
              height='100%'
              width='100%'  
              justifyContent='space-between'
              alignItems='center'
              padding='16px 9px 8px 9px'
              
            >
              <Stack direction='row' alignItems='center' spacing={1}>
                <Rating 
                  name="half-rating-read" 
                  value={!ratingValue ? 2.5 : ratingValue} 
                  precision={0.5} 
                  readOnly 
                  sx={{
                    '& .MuiRating-icon': {
                      fontSize: '1.5em',
                    },
                    flexDirection: 'column-reverse'
                  }}
                  icon={<StarIcon sx={{ color: '#E7AE1A'}} fontSize="inherit" />}
                  emptyIcon={<StarIcon sx={{ color: '#627171'}} fontSize="inherit" />}
                />
                <Slider
                  sx={{
                    height: '80%',
                    '& input[type="range"]': {
                      // WebkitAppearance: 'slider-vertical',
                      writingMode: 'vertical-lr',
                      direction: 'rtl'
                    },
                    '& .MuiSlider-valueLabel': {
                      left: '40px',
                      right: '0px',
                    },
                    '& .MuiSlider-valueLabel::before': {
                      display: 'none'
                    },
                    '& .MuiSlider-track': {
                      color: '#E7AE1A',
                    },
                    '& .MuiSlider-thumb': {
                      color: '#E7AE1A'
                    }
                  }}
                  orientation="vertical"
                  aria-label="Rating"
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  value={!ratingValue ? 2.5 : ratingValue}
                  min={0}
                  max={5}
                  step={0.5}
                  disabled={isTurnip || isGoldNugget ? true : false}
                />
              </Stack>
              <Typography
                onChange={handleInputChange}
                onBlur={handleBlur}
                color='#E7AE1A'
              >
                {`${!ratingValue ? '2.5' : ratingValue} / 5`}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack justifyContent='center' >
          <QuickRatingBtns 
            btnType={'validate'} 
            handleBtnAction={handleBtnAction}
          />
        </Stack>
      </Stack>
      
    </Popover>    
  );
};

export default SwipeQuickRating;