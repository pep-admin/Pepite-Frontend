// Import des libs externes
import { Badge, Stack } from '@mui/material';
import React, { FC, useState } from 'react';

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

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  is_rated: boolean;
  is_unwanted: boolean;
  is_wanted: boolean;
  is_watched: boolean;
  is_gold_nugget: boolean;
  is_turnip: boolean;
  user_rating: number | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ErrorState {
  state: boolean | null;
  message: string | null;
}

interface ChoiceBtn2Props {
  movies: Array<Movie>;
  setMovies: React.Dispatch<React.SetStateAction<Movie | null>>;
  currentIndex: number | null;
  choice: string;
  isActive: boolean | null;
  handleActions: (
    btnChoice: string,
    rating: number | undefined,
    isGoldNugget: boolean | undefined,
    isTurnip: boolean | undefined,
    validateOrCancel: string | undefined,
  ) => void;
  isGoldNugget: boolean;
  setIsGoldNugget: React.Dispatch<React.SetStateAction<boolean | null>>;
  isTurnip: boolean;
  setIsTurnip: React.Dispatch<React.SetStateAction<boolean | null>>;
  error: ErrorState;
}

const ChoiceBtn: FC<ChoiceBtn2Props> = React.memo(
  ({
    movies,
    setMovies,
    currentIndex,
    choice,
    isActive,
    handleActions,
    isGoldNugget,
    setIsGoldNugget,
    isTurnip,
    setIsTurnip,
    error,
  }) => {
    const [anchorRatingBtn, setAnchorRatingBtn] =
      useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorRatingBtn(event.currentTarget);
    };

    const closePopover = () => {
      setAnchorRatingBtn(null);
    };

    const openPopover = Boolean(anchorRatingBtn);

    return (
      <>
        <Stack alignItems="center" justifyContent="center">
          <CustomButton
            variant="contained"
            btntype={
              choice === 'unwanted' || choice === 'wanted' ? 'center' : 'side'
            }
            choice={choice}
            isactive={isActive}
            errorstate={error.state}
            onClick={
              choice !== 'quick_rating'
                ? () =>
                    handleActions(
                      choice,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                    )
                : e => handleClick(e)
            }
          >
            {choice === 'unwanted' ? (
              isActive ? (
                <DeleteForeverOutlinedIcon
                  sx={{ fontSize: '2.5em', color: '#dd111b' }}
                />
              ) : (
                <DeleteOutlinedIcon
                  sx={{ fontSize: '2.5em', color: '#dd111b' }}
                />
              )
            ) : choice === 'wanted' ? (
              isActive ? (
                <PlaylistAddCheckOutlinedIcon
                  sx={{
                    fontSize: '2.5em',
                    position: 'relative',
                    left: '1px',
                    color: '#17db17',
                  }}
                />
              ) : (
                <PlaylistAddOutlinedIcon
                  sx={{
                    fontSize: '2.5em',
                    position: 'relative',
                    left: '1px',
                    color: '#17db17',
                  }}
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
            ) : (
              <Badge
                badgeContent={movies[currentIndex].user_rating}
                invisible={!movies[currentIndex].user_rating}
                sx={{
                  '& .MuiBadge-badge': {
                    top: '-10px',
                    height: '19px',
                    backgroundColor: '#E7AE1A',
                    color: '#000',
                    fontWeight: 'bold',
                  },
                }}
              >
                <StarBorderOutlinedIcon
                  sx={{ fontSize: '2em', color: '#E7AE1A' }}
                />
              </Badge>
            )}
          </CustomButton>
        </Stack>
        {choice === 'quick_rating' && (
          <SwipeQuickRating
            movies={movies}
            setMovies={setMovies}
            currentIndex={currentIndex}
            openPopover={openPopover}
            anchorRatingBtn={anchorRatingBtn}
            closePopover={closePopover}
            handleActions={handleActions}
            isGoldNugget={isGoldNugget}
            setIsGoldNugget={setIsGoldNugget}
            isTurnip={isTurnip}
            setIsTurnip={setIsTurnip}
          />
        )}
      </>
    );
  },
);

ChoiceBtn.displayName = 'ChoiceBtn';

export default ChoiceBtn;
