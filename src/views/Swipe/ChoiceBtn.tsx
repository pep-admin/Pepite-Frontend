// Import des libs externes
import { Badge, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

// Import des composants internes
import { CustomButton } from '@views/Swipe/CustomBtn';

// Import des interfaces TS
import { Movie } from 'types/interface';

// Import des hooks
import { useSnackbar } from '@hooks/SnackbarContext';

// Import des icônes
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

interface ChoiceBtn2Props {
  currentMovie: Movie;
  isMovieOrSerie: string;
  choice: string;
  handleSwipeBtns: (
    choice: string,
    movie: Movie,
    isMovieOrSerie: string,
    rating: number | undefined,
    handleOpenSnackbar: (message: string) => void,
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

const ChoiceBtn: FC<ChoiceBtn2Props> = React.memo(
  ({
    currentMovie,
    isMovieOrSerie,
    choice,
    handleSwipeBtns,
  }) => {

    const handleOpenSnackbar = useSnackbar(); 

    const [isActive, setIsActive] = useState(false);

    const handleClick = (_: React.MouseEvent<HTMLButtonElement>) => {
      console.log('faire un swipe venant du côté pour noter le film');
      
    };

    useEffect(() => {
      // Vérifie si l'ID du film est dans le tableau correspondant dans le local storage
      const updateIsActive = () => {
        const storedMovies = JSON.parse(localStorage.getItem(`${choice}Movies`)) || [];
        setIsActive(storedMovies.includes(currentMovie.id)); 
      };
  
      // Appel initial
      updateIsActive();
  
    }, [currentMovie.id, choice]);

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
            // errorstate={error.state}
            onClick={
              choice !== 'quick_rating'
                ? () =>
                    handleSwipeBtns(
                      choice,
                      currentMovie,
                      isMovieOrSerie,
                      null,
                      handleOpenSnackbar,
                      isActive,
                      setIsActive,
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
                badgeContent={currentMovie.user_rating}
                invisible={!currentMovie.user_rating}
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
        {/* {choice === 'quick_rating' && (
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
        )} */}
      </>
    );
  },
);

ChoiceBtn.displayName = 'ChoiceBtn';

export default ChoiceBtn;
