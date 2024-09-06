import { Popover, Box, Stack, Slider, Rating, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

const SwipeQuickRating = ({ openPopover, anchorRatingBtn, closePopover }) => {

  const [ratingValue, setRatingValue] = useState(2.5);

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
        transform: 'translate(0px, -15px)',
        '& .MuiPopover-paper': {
          background: 'none',
          overflow: 'visible',
        }
      }}
    >
      <Box
        height='175px'
        width='auto'
        sx={{
          background: 'linear-gradient(to bottom right, rgba(4, 50, 50, 1) 0%, rgba(1, 18, 18, 1) 60%, rgba(1, 18, 18, 0) 100%)',
          backgroundColor: '#011212',
          boxShadow: 'inset 4.5px 4px 4px rgba(2, 48, 48, 1)',
          borderRadius: '15px'
        }}
      >
        <Stack 
          height='100%'
          width='100%'  
          justifyContent='space-between'
          alignItems='center'
          padding='15px 9px 8px 9px'
          
        >
          <Stack direction='row' alignItems='center' spacing={1}>
            <Rating 
              name="half-rating-read" 
              value={ratingValue} 
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
                  WebkitAppearance: 'slider-vertical',
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
              value={ratingValue}
              min={0}
              max={5}
              step={0.5}
            />
          </Stack>
          <Typography
            onChange={handleInputChange}
            onBlur={handleBlur}
            color='#E7AE1A'
          >
            {`${ratingValue} / 5`}
          </Typography>
        </Stack>

      </Box>
    </Popover>
  );
};

export default SwipeQuickRating;