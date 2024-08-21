import { Snackbar, Stack, Typography } from '@mui/material';

// Import des composants internes
import { CustomButton } from './CustomBtn';

// Import des icônes
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRef, useState } from 'react';

// Import des requêtes
// import { addWatchedMovieRequest } from '@utils/request/list/addWatchedMovieRequest';
// import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';
// import { addUnwantedMovieRequest } from '@utils/request/list/addUnwantedMovieRequest';
// import { recoverUnwantedMovieRequest } from '@utils/request/list/recoverUnwantedMovieRequest';
// import { addWantedMovieRequest } from '@utils/request/list/addWantedMovieRequest';
// import { removeWantedMovieRequest } from '@utils/request/list/removeWantedMovieRequest';

const ChoiceBtn2 = ({
  choice,
  movie,
  setOpenSnackbar
}) => {

  const [isUnwanted, setIsUnwanted] = useState(movie.is_unwanted);
  const [isWanted, setIsWanted] = useState(movie.is_wanted);
  const [isWatched, setIsWatched] = useState(movie.is_watched);

  const handleMovieStateInfo = (state) => {
    
    switch(state) {
      case 'unwanted' :
        if(!isUnwanted) {
          setOpenSnackbar(`"${movie.title}" ne vous sera plus proposé`);
        } else {
          setOpenSnackbar(`"${movie.title}" pourra vous être proposé`);
        }
        setIsUnwanted(!isUnwanted);
        break;

      case 'wanted' :
        if(!isWanted) {
          setOpenSnackbar(`"${movie.title}" a été ajouté à votre liste`);
        } else {
          setOpenSnackbar(`"${movie.title}" a été retiré de votre liste`);
        }
        setIsWanted(!isWanted);
        break;

      case 'watched' :
        if(!isWatched) {
          setOpenSnackbar(`Vous avez déjà vu "${movie.title}"`);
        } else {
          setOpenSnackbar(`Vous n'avez pas vu "${movie.title}"`);
        }
        setIsWatched(!isWatched);
        break;
      default : 
        break;
    }
  }

  return (
    <>
      <Stack alignItems="center" justifyContent='center'>
        <CustomButton
          variant="contained"
          btntype={'others'}
          choice={choice}
          isunwanted={isUnwanted}
          iswanted={isWanted}
          iswatched={isWatched}
          onClick={() => handleMovieStateInfo(choice) }
        >
          {choice === 'unwanted' ? (
            isUnwanted ?
              <DeleteForeverOutlinedIcon fontSize="large" />
            :
              <DeleteOutlinedIcon fontSize='large' />
          ) : choice === 'wanted' ? (
            <ThumbUpOutlinedIcon fontSize="large" />
          ) : (
            isWatched ?
              <VisibilityOutlinedIcon fontSize="large" />
            :
              <VisibilityOffOutlinedIcon fontSize="large" />
          )}
        </CustomButton>
      </Stack>
      
    </>
    
  );
};

export default ChoiceBtn2;