// Import des libs externes
import { Stack, Typography, Divider, CardContent} from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import ChoiceBtn from './ChoiceBtn';
import ColoredRating from '@utils/components/ColoredRating';

// Import du contexte 
import { useData } from '@hooks/DataContext';

// Import des fonctions utilitaires
import { convertRating } from '@utils/functions/convertRating';
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

// Import des noms des genres raccourcis
import { shortGenresMovieList, shortGenresSerieList } from '@utils/data/shortGenres';

const SwipeContent2 = ({ 
  movieDetail, 
  movies, 
  index, 
  currentMovieIndex,
  setCurrentMovieIndex,
  showMovieInfos, 
  setShowMovieInfos, 
  moviesStatusUpdated, 
  setMoviesStatusUpdated, 
  swipeToTheRight,
  swipeType
}) => {
  console.log(movieDetail);
  

  const getTitle = (movie) => {
    console.log(movie);
    
    if (movie && movie.id === movies[index].id) {
      if('title' in movie) {
        return movie.title;
      }
      if('name' in movie) {
        return movie.name;
      }
    }
  }

  const currentTitle = getTitle(movieDetail.current);
  const nextTitle = getTitle(movieDetail.next);

  // Fonction pour obtenir les genres raccourcis du film
  const getGenres = movie => {
    if (movie && movie.id === movies[index].id) {
      let shortGenres;

      if(swipeType === 'movie') {
        shortGenres = shortGenresMovieList;
      } else {
        shortGenres = shortGenresSerieList;
      }
      
      // Si des genres existent
      return movie.genres.length
        ? movie.genres.map(genre => {
            // Trouver le genre raccourci correspondant dans shortGenres
            const genres = shortGenres.find(sg => sg.id === genre.id);
            // Retourner le nom raccourci s'il existe, sinon retourner le nom original
            return genres ? genres.name : genre.name;
          }).join(', ')
        : 'Non spécifié';
    }
    return null;
  };

  // Vérification des genres pour le film affiché et le film suivant
  const genresCurrent = getGenres(movieDetail.current);
  const genresNext = getGenres(movieDetail.next);

  // Fonction pour extraire l'année à partir d'une date
  const getYear = date => {
    return date ? date.split('-')[0] : 'Non spécifié';
  };

  // Détermine la date à utiliser si l'utilisateur a choisi films ou séries
  const date =
    swipeType === 'movie'
      ? movies[index].release_date
      : movies[index].first_air_date;

  // Sélectionner le bon détail de film (affiché ou suivant)
  const movieToDisplay =
    movieDetail.current && movieDetail.current.id === movies[index].id
      ? movieDetail.current
      : movieDetail.next && movieDetail.next.id === movies[index].id
      ? movieDetail.next
      : null;

  // Récupère les noms français des pays de production
  const productionCountries = movieToDisplay
    ? findFrenchNameCountry(movieToDisplay.production_countries).join(', ')
    : null;

  return (
    <>
      <CardContent
        sx={{
          height: 'auto',
          width: '100%',
          padding: '0 !important'
        }}
      >
        <Stack>
          <Stack>
            <Stack 
              direction='row' 
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography 
                component='h1' 
                fontSize='6.5vh' 
                fontFamily='League Spartan'
                fontWeight='700'
                color='primary.main'
                lineHeight='1.1'
                maxWidth='85%'
                letterSpacing='-1px'
                sx={{
                  WebkitTextStroke: '1px black',
                }}
              >
                {currentTitle || nextTitle}
              </Typography>
              <Typography 
                component='p' 
                fontSize='7.5vh' 
                fontFamily='League Spartan'
                fontWeight='500'
                color='primary.main'
                lineHeight='0.9'
                position='relative'
                top='5px'
                onClick={() => setShowMovieInfos(!showMovieInfos)}
              > 
                {
                  !showMovieInfos ?
                    '+'
                  :
                    '-'
                }
              </Typography>
            </Stack>
            <Stack direction='row' whiteSpace='nowrap'>
              <Typography 
                fontSize='2.2vh'
                fontFamily='League Spartan'
                fontWeight='500'
                color='secondary.main'
              >
                {'release_date' in movies[index] ?
                  'Film'
                  :
                  'Série'
                }
              </Typography>
              <Divider 
                orientation='vertical' 
                flexItem 
                sx={{ 
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center'
                }} 
              />
              <Typography 
                fontSize='2.2vh'
                fontFamily='League Spartan'
                fontWeight='500'
                color='secondary.main'
                maxWidth='150px'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {genresCurrent || genresNext}
              </Typography>
              <Divider 
                orientation='vertical' 
                flexItem 
                sx={{ 
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center'
                }} 
              />
              <Typography 
                fontSize='2.2vh'
                fontFamily='League Spartan'
                fontWeight='500'
                color='secondary.main'
              >
                {getYear(date)}
              </Typography>
              <Divider 
                orientation='vertical' 
                flexItem 
                sx={{ 
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center'
                }} 
              />
              <Stack direction='row'>
                <StarIcon fontSize='small' sx={{ color: 'secondary.main', marginRight: '5px'}}/>
                <Typography 
                  fontSize='2.2vh'
                  fontFamily='League Spartan'
                  fontWeight='500'
                  color='secondary.main'
                >
                  {convertRating(movies[index].vote_average)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack 
            height={!showMovieInfos ? '10vh' : '5vh'}
            direction={!showMovieInfos ? 'row' : 'column'}
            justifyContent='space-between'
            padding={!showMovieInfos ? '23px 0' : '0'}
            marginBottom={!showMovieInfos ? '23px' : '0'}
          >
            {
              !showMovieInfos ?
              <>
                <Stack>
                  <Typography fontSize='2.4vh' color='#fff'>
                    Moyenne des 
                    <span style={{ color: '#DD8C28', fontWeight: '500'}}> amis</span>
                  </Typography>
                  <Stack 
                    height='15px' 
                    direction='row' 
                    alignItems='center'
                    position='relative'
                    left='2.5px'
                  >
                    <ColoredRating
                      color='#DD8C28'
                      emptyColor='#B9B9B9'
                      value={4.3}
                      readOnly={true}
                      precision={0.1}
                    />
                    <Typography
                      fontSize='2.4vh'
                      component="span"
                      sx={{
                        color: '#DD8C28',
                        fontWeight: '500',
                      }}
                    >
                      {'4.3'}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography fontSize='2.4vh' color='#fff'>
                    Moyenne des 
                    <span style={{ color: '#24A5A5', fontWeight: '500'}}> suivis</span>
                  </Typography>
                  <Stack 
                    height='15px' 
                    direction='row' 
                    alignItems='center'
                    position='relative'
                    left='2.5px'
                  >
                    <ColoredRating
                      color='#24A5A5'
                      emptyColor='#B9B9B9'
                      value={4.1}
                      readOnly={true}
                      precision={0.1}
                    />
                    <Typography
                      fontSize='2.4vh'
                      component="span"
                      sx={{
                        color: '#24A5A5',
                        fontWeight: '500',
                      }}
                    >
                      {'4.1'}
                    </Typography>
                  </Stack>
                </Stack>
              </>
              :
              <Stack direction='row' alignItems='center' justifyContent='center' flexBasis='100%' columnGap='5px'>
                <CircleIcon color='primary' sx={{ fontSize: '1vh' }} />
                <CircleIcon color='primary' sx={{ fontSize: '1vh' }} />
              </Stack>            
            }
          </Stack>
          <Stack 
            sx={{
              display: !showMovieInfos ? 'none' : 'flex',
              opacity: !showMovieInfos ? '0' : '1',
              transition: !showMovieInfos ? 'opacity 0ms ease-in-out' : 'opacity 600ms ease-in-out'
            }}
          >
            <Stack 
              maxHeight='27vh'
              sx={{
                overflowY: 'scroll'
              }}
            >
              <Typography
                color='primary' 
                fontWeight='300'
                lineHeight='1.6'
                fontSize='2.1vh'
              >
                {
                  movies[index].overview === null ? 
                    "Désolé, il n'y a pas de synopsis disponible pour ce film..."
                  : movies[index].overview
                }
              </Typography>
            </Stack>
            <Stack height='15vh' justifyContent='space-evenly' margin='7px 0 10px 0'>
              <Stack direction='row' columnGap='10px'>
                <Typography color='secondary' fontWeight='500'>
                  {'Pays :'}
                </Typography>
                <Typography color='primary' fontWeight='300'>
                  {productionCountries}
                </Typography>
              </Stack>
              <Stack direction='row' columnGap='10px'>
                <Typography color='secondary' fontWeight='500'>
                  {'Réalisation :'}
                </Typography>
                <Typography color='primary' fontWeight='300'>
                  {'Le nom du real'}
                </Typography>
              </Stack>
              <Stack direction='row' columnGap='10px'>
                <Typography color='secondary' fontWeight='500'>
                  {'Acteurs :'}
                </Typography>
                <Typography color='primary' fontWeight='300'>
                  {'Le nom des acteurs'}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Stack 
        height='100px'
        width='100%'
        direction='row' 
        justifyContent='space-between'
        padding='0 5% 15px 5%'
      >
        <ChoiceBtn 
          choice={'unwanted'} 
          moviesStatusUpdated={moviesStatusUpdated}
          setMoviesStatusUpdated={setMoviesStatusUpdated}
          index={index}
          currentMovieIndex={currentMovieIndex}
          setCurrentMovieIndex={setCurrentMovieIndex}
          swipeToTheRight={swipeToTheRight}
        />
        <ChoiceBtn 
          choice={'wanted'} 
          moviesStatusUpdated={moviesStatusUpdated}
          setMoviesStatusUpdated={setMoviesStatusUpdated}
          index={index}
          currentMovieIndex={currentMovieIndex}
          setCurrentMovieIndex={setCurrentMovieIndex}
          swipeToTheRight={null}
        />
        <ChoiceBtn 
          choice={'watched'} 
          moviesStatusUpdated={moviesStatusUpdated}
          setMoviesStatusUpdated={setMoviesStatusUpdated}
          index={index}
          currentMovieIndex={currentMovieIndex}
          setCurrentMovieIndex={setCurrentMovieIndex}
          swipeToTheRight={swipeToTheRight}
        />
      </Stack>
    </>
  )
};

SwipeContent2.propTypes = {
  index: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.object.isRequired,
};

export default SwipeContent2;
