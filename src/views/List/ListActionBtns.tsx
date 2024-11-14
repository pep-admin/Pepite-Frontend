import { Stack } from '@mui/material';
import ListButton from './ListButton';
import { listButtons } from '@utils/data/listButtons';
import { handleWatchedMovieRequest } from '@utils/request/list/handleWatchedMovieRequest';
import { useSnackbar } from '@hooks/SnackbarContext';
import { handleWantedMovieRequest } from '@utils/request/list/handleWantedMovieRequest';
import { useNavigate } from 'react-router-dom';

const ListActionBtns = ({ listSectionIndex, movie, isMovieOrSerie, onComplete }) => {

  const handleOpenSnackbar = useSnackbar(); 
  const navigate = useNavigate();

  const handleBtnAction = async (actionType) => {
    
    try {
      const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
      const sectionName = listSectionIndex === 0 ? 'wanted' : 'watched';
      const dbTable = isMovieOrSerie === 'movie' ? 'movie' : 'tv';

      let response;

      switch (actionType) {
        case 'set_watched':
          console.log('vu');
          response = await handleWatchedMovieRequest(movie.id, isMovieOrSerie, true); // Ajout dans la liste des films vus (à noter)
          handleOpenSnackbar(`${response.message} ${movieTitle}.`);
          onComplete(sectionName);
          break;
        case 'set_unwatched':
          console.log('pas vu');
          await handleWantedMovieRequest(movie.id, isMovieOrSerie, true); // Replacement du film dans la liste des films voulus
          response = await handleWatchedMovieRequest(movie.id, isMovieOrSerie, false); // Suppression de la liste des films vus
          handleOpenSnackbar(`${response.message} ${movieTitle}.`);
          break;
        case 'note':
          navigate(`/rating/${dbTable}/${movie.id}/review`)
          console.log('noter');
          break;
        case 'delete':
          console.log('supprimer');
          break;
        default:
          break;
      }

      onComplete(sectionName); // Rechargement de la liste des films après l'action
    } catch (error) {
      
    }
  };

  return (
    <Stack direction='row' spacing={2}>
      {listSectionIndex === 0 ?
        <>
          <ListButton
            btn={listButtons[0]}
            handleBtnAction={handleBtnAction}
          />
          <ListButton
            btn={listButtons[2]}
            handleBtnAction={handleBtnAction}
          />
          <ListButton
            btn={listButtons[3]}
            handleBtnAction={handleBtnAction}
          />
        </>
        :
        <>
          <ListButton
            btn={listButtons[1]}
            handleBtnAction={handleBtnAction}
          />
          <ListButton
            btn={listButtons[2]}
            handleBtnAction={handleBtnAction}
          />
          <ListButton
            btn={listButtons[3]}
            handleBtnAction={handleBtnAction}
          />
        </>
      }
    </Stack>
  );
};

export default ListActionBtns;