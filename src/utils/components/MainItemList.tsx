//  Import des libs externes
import { Stack, Divider } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import CustomAlert from '@utils/components/CustomAlert';
import MainItemContent from './MainItemContent';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { removeFriendRequest } from '@utils/request/friendship/removeFriendRequest';
import { unfollowSomeone } from '@utils/request/followed/unfollowSomeone';
import { removeWantedMovieRequest } from '../request/list/removeWantedMovieRequest';
import { removeWatchedMovieRequest } from '../request/list/removeWatchedMovieRequest';
import { addWantedMovieRequest } from '@utils/request/list/addWantedMovieRequest';
import MainItemIcons from './MainItemIcons';

const MainItemList = ({
  type,
  data,
  list,
  getRequest,
  getRequest2,
  isLast,
  movieOrSerie
}) => {
  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
  const [showRemoveFollowedModal, setShowRemoveFollowedModal] = useState(false);
  const [showRemoveWantedMovie, setShowRemoveWantedMovie] = useState(false);
  const [showRemoveWatchedMovie, setShowRemoveWatchedMovie] = useState(false);

  const { displayType } = useData();    

  // Supprime un ami de la liste d'amis
  const removeFriendFromList = async () => {    
    await removeFriendRequest(data.id);
    getRequest();
  };

  // Supprime un suivi de la liste des suivis
  const removeFollowedFromList = async () => {
    await unfollowSomeone(data.id);
    getRequest(); // Met à jour la liste des suivis
  };

  // Supprime un film de la liste à voir
  const removeWantedMovie = async () => {
    await removeWantedMovieRequest(data.id, displayType);
    getRequest(); // Met à jour la liste des films / séries à voir
  };

  // Supprime un film de la liste des films à noter
  const removeWatchedMovie = async (choice) => {
    console.log('suppression');
    await removeWatchedMovieRequest(data.id, movieOrSerie);
    getRequest();
    if(choice === 'cancel') {
      console.log('annulation');
      await addWantedMovieRequest(data.id, movieOrSerie);
    }
  };

  return (
    <>
      {showRemoveFriendModal ||
      showRemoveFollowedModal ||
      showRemoveWantedMovie ||
      showRemoveWatchedMovie ? (
        <CustomAlert
          alertType="warning"
          message={
            showRemoveFriendModal ? (
              <span>
                {'Êtes vous sûr(e) de vouloir retirer '}
                <strong> {data.first_name} </strong>
                <strong> {data.last_name} </strong>
                {"de votre liste d'amis?"}
              </span>
            ) : showRemoveFollowedModal ? (
              <span>
                {'Êtes vous sûr(e) de ne plus vouloir suivre '}
                <strong> {data.first_name} </strong>
                <strong> {data.last_name} ?</strong>
              </span>
            ) : showRemoveWantedMovie ? (
              <span>
                {'Êtes-vous sûr(e) de vouloir retirer '}
                {movieOrSerie === 'movie' ? (
                  <strong> {data.title} </strong>
                ) : (
                  <strong> {data.name} </strong>
                )}
                {`de votre liste des ${
                  movieOrSerie === 'movie'
                    ? 'films à voir'
                    : 'séries à voir'
                } ?`}
              </span>
            ) : showRemoveWatchedMovie ? (
              <span>
                {'Êtes-vous sûr(e) de vouloir retirer '}
                {movieOrSerie === 'movie' ? (
                  <strong> {data.title} </strong>
                ) : (
                  <strong> {data.name} </strong>
                )}
                {`de votre liste des ${
                  movieOrSerie === 'movie' ? 'films ' : 'séries '
                } à noter ?`}
              </span>
            ) : null
          }
          setShowModal={
            showRemoveFriendModal
              ? setShowRemoveFriendModal
              : showRemoveFollowedModal
              ? setShowRemoveFollowedModal
              : showRemoveWantedMovie
              ? setShowRemoveWantedMovie
              : showRemoveWatchedMovie
              ? setShowRemoveWatchedMovie
              : null
          }
          confirmation={
            showRemoveFriendModal
              ? removeFriendFromList
              : showRemoveFollowedModal
              ? removeFollowedFromList
              : showRemoveWantedMovie
              ? removeWantedMovie
              : showRemoveWatchedMovie
              ? removeWatchedMovie
              : null
          }
        />
      ) : null}
      <Stack direction="row" justifyContent="space-between" padding='5px'>
        <MainItemContent 
          type={type} 
          data={data} 
          movieOrSerie={movieOrSerie} 
          list={list} 
        />
        <MainItemIcons 
          type={type} 
          data={data} 
          movieOrSerie={movieOrSerie} 
          getRequest={getRequest} 
          getRequest2={getRequest2}
          // updateFriendList={updateFriendList} 
          removeWatchedMovie={removeWatchedMovie}
          showRemoveFriendModal={showRemoveFriendModal}
          setShowRemoveFriendModal={setShowRemoveFriendModal}
          showRemoveFollowedModal={showRemoveFollowedModal}
          setShowRemoveFollowedModal={setShowRemoveFollowedModal}
          showRemoveWantedMovie={showRemoveWantedMovie}
          setShowRemoveWantedMovie={setShowRemoveWantedMovie}
          showRemoveWatchedMovie={showRemoveWatchedMovie}
          setShowRemoveWatchedMovie={setShowRemoveWatchedMovie}
        />
      </Stack>
      {!isLast ? <Divider /> : null}
    </>
  );
};

MainItemList.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  getRequest: PropTypes.func.isRequired,
  getRequest2: PropTypes.func,
  getFollowed: PropTypes.func,
  list: PropTypes.array,
};

export default MainItemList;
