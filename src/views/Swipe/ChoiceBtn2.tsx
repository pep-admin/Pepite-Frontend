// Import des libs externes
import { Stack } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import { CustomButton } from '@views/Swipe/CustomBtn';
import SwipeQuickRating from '@views/Swipe/SwipeQuickRating';

// Import des icônes
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

interface ErrorState {
  state: boolean | null;
  message: string | null;
}

interface ChoiceBtn2Props {
  choice: string;
  isActive: boolean;
  handleActions: (btnChoice: string) => void;
  error: ErrorState;
}

const ChoiceBtn2: FC<ChoiceBtn2Props> = React.memo(
  ({ choice, isActive, handleActions, error }) => {

    const [anchorRatingBtn, setAnchorRatingBtn] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {      
      setAnchorRatingBtn(event.currentTarget);
    };

    const closePopover = () => {
      setAnchorRatingBtn(null);
    };

    const openPopover = Boolean(anchorRatingBtn);

    return (
      <>
        <Stack 
          alignItems="center" 
          justifyContent="center"
        >
          <CustomButton
            variant="contained"
            btntype={ choice === 'unwanted' || choice === 'wanted' ? 'center' : 'side' }
            choice={choice}
            isactive={isActive}
            errorstate={error.state}
            onClick={ choice !== 'quick_rating' ? () => handleActions(choice) : (e) => handleClick(e)}
          >
            {choice === 'unwanted' ? (
              isActive ? (
                <DeleteForeverOutlinedIcon sx={{ fontSize: '2.5em', color: '#dd111b' }} />
              ) : (
                <DeleteOutlinedIcon sx={{ fontSize: '2.5em', color: '#dd111b' }} />
              )
            ) : choice === 'wanted' ? (
              isActive ? (
                <PlaylistAddCheckOutlinedIcon
                  sx={{ fontSize: '2.5em', position: 'relative', left: '1px', color: '#17db17' }}
                />
              ) : (
                <PlaylistAddOutlinedIcon
                  sx={{ fontSize: '2.5em', position: 'relative', left: '1px', color: '#17db17' }}
                />
              )
            ) : choice === 'watched' ? (
              isActive ? (
                <VisibilityOutlinedIcon
                  sx={{ fontSize: '2em', color: '#0295c7' }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  sx={{ fontSize: '2em', color: '#0295c7' }}
                />
              )
            )
              :
                <StarBorderOutlinedIcon
                  sx={{ fontSize: '2em', color: '#E7AE1A' }}
                />
            }
          </CustomButton>
        </Stack>
        {
          choice === 'quick_rating' &&
          <SwipeQuickRating openPopover={openPopover} anchorRatingBtn={anchorRatingBtn} closePopover={closePopover} />
        }
      </>
    );
  },
);

ChoiceBtn2.propTypes = {
  choice: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleActions: PropTypes.func.isRequired,
  // error: PropTypes.object.isRequired
}

export default ChoiceBtn2;
