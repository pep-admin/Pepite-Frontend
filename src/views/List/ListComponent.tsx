// Import des libs externes
import { Container, Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/Header';
import ProfilSuggestedNotes from '@views/Profil/ProfilSuggestedNotes';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import MainItemList from '@utils/MainItemList';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { getWantedMoviesRequest } from '@utils/request/list/getWantedMoviesRequest';
import { getWatchedMoviesRequest } from '@utils/request/list/getWatchedMoviesRequest';
import { getAllCriticsOfUser } from '@utils/request/critics/getCritics';

const ListComponent = () => {
  const { id } = useParams();
  const { displayType } = useData();

  const [userInfos, setUserInfos] = useState(
    // L'utilisateur connecté
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [wantedMovies, setWantedMovies] = useState([]); // Les films que l'utilisateur a choisi de voir
  const [watchedMovies, setWatchedMovies] = useState([]); // Les films que l'utilisateur a déjà vu
  const [ratedMovies, setRatedMovies] = useState([]); // Les films que l'utilisateur a noté

  const getWantedMovies = async () => {
    const wanted = await getWantedMoviesRequest(id, displayType);
    setWantedMovies(wanted);
  };

  const getWatchedMovies = async () => {
    const watched = await getWatchedMoviesRequest(id, displayType);
    setWatchedMovies(watched);
  };

  const getRatedMovies = async () => {
    const rated = await getAllCriticsOfUser(id, displayType);
    console.log('les films notés', rated);
    setRatedMovies(rated);
  };

  useEffect(() => {
    getWantedMovies();
    getWatchedMovies();
    getRatedMovies();
  }, [displayType]);

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="column" spacing={1}>
          <SearchBar
            Item={Item}
            page={'contacts'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <Item
            customheight="calc(100% - 6px)"
            customwidth="100%"
            margintop="6px"
            overflow="hidden"
          >
            <ProfilSuggestedNotes
              page={'list'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              userInfos={userInfos}
            />
          </Item>
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 10px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {wantedMovies.length ? `${wantedMovies.length}` : 'Aucun '}
                {` film${wantedMovies.length > 1 ? 's' : ''} à voir`}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                fontWeight="bold"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {'Voir tous'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{ maxHeight: '188px', overflowY: 'scroll' }}
            >
              {wantedMovies.length ? (
                wantedMovies.map((movie, index) => {
                  return (
                    <MainItemList
                      key={movie.id}
                      type={'wanted-movies'}
                      data={movie}
                      list={wantedMovies}
                      getRequest={getWantedMovies}
                      getRequest2={getWatchedMovies}
                      isLast={index === wantedMovies.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {'Aucun film à voir '}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 10px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {watchedMovies.length}{' '}
                {`film${watchedMovies.length > 1 ? 's' : ''} à noter`}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                fontWeight="bold"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {'Voir tous'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{
                maxHeight: '188px',
                overflowY: 'scroll',
              }}
            >
              {watchedMovies.length ? (
                watchedMovies.map((movie, index) => {
                  return (
                    <MainItemList
                      key={movie.id}
                      type={'watched-movies'}
                      data={movie}
                      list={watchedMovies}
                      getRequest={getWatchedMovies}
                      getRequest2={null}
                      isLast={index === watchedMovies.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {'Aucun film à voir '}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 10px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {ratedMovies.length}{' '}
                {`film${ratedMovies.length > 1 ? 's' : ''} notés`}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                fontWeight="bold"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {'Voir tous'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{
                maxHeight: '188px',
                overflowY: 'scroll',
              }}
            >
              {ratedMovies.length ? (
                ratedMovies.map((movie, index) => {
                  return (
                    <MainItemList
                      key={movie.id}
                      type={'rated-movies'}
                      data={movie}
                      list={ratedMovies}
                      getRequest={getWatchedMovies}
                      getRequest2={null}
                      isLast={index === ratedMovies.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {'Aucun film à voir '}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
        </Stack>
      </Container>
    </>
  );
};

export default ListComponent;
