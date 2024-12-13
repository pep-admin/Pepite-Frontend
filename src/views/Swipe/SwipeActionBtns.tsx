import { Stack } from '@mui/material';
import ChoiceBtn from './ChoiceBtn';
import { handleSwipeBtns } from '@utils/functions/handleSwipeBtns';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const SwipeActionBtns = ({ 
  showTrailer, 
  currentMovie, 
}) => {

  const isMovieOrSerie = findIfMovieOrSerie(currentMovie);

  return (
    <Stack
      height="100px"
      width="100%"
      direction="row"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      zIndex="1100"
      justifyContent="space-between"
      padding="0 6% 15px 6%"
      display={!showTrailer ? 'flex' : 'none'}
    >
      <ChoiceBtn
        choice={'unwanted'}
        currentMovie={currentMovie}
        isMovieOrSerie={isMovieOrSerie}
        handleSwipeBtns={handleSwipeBtns}
      />
      <Stack direction="row" spacing={5}>
        <ChoiceBtn
          choice={'watched'}
          currentMovie={currentMovie}
          isMovieOrSerie={isMovieOrSerie}
          handleSwipeBtns={handleSwipeBtns}
        />
        <ChoiceBtn
          choice={'quick_rating'}
          currentMovie={currentMovie}
          isMovieOrSerie={isMovieOrSerie}
          handleSwipeBtns={handleSwipeBtns}
        />
      </Stack>
      <ChoiceBtn
        choice={'wanted'}
        currentMovie={currentMovie}
        isMovieOrSerie={isMovieOrSerie}
        handleSwipeBtns={handleSwipeBtns}
      />
    </Stack>
  );
};

export default SwipeActionBtns;