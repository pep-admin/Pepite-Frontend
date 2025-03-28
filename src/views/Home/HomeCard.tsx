import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GoldNuggetIcon from '@utils/components/GoldNuggetIcon';
import { TurnipIcon } from '@utils/components/styledComponent';
import { formatRating } from '@utils/functions/formatRating';

const HomeCard = ({ homeSectionRef, movie, setShowFilmDetails }) => {
  const isSkeleton = !movie.id; // Si l'objet film n'a pas d'ID, c'est un skeleton

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-'); // Séparer l'année, le mois et le jour
    return `${day}.${month}.${year.slice(2)}`; // Réorganiser en 18.10.24 (jour.mois.année)
  };

  // Affiche conditionnellement l'information de pépite OU navet OU note
  const getAverageInfos = () => {
    const totalCritics = movie.grouped_critics.length;
    const goldCount = movie.grouped_critics.filter(
      critic => critic.is_gold_nugget === 1,
    ).length;
    const turnipCount = movie.grouped_critics.filter(
      critic => critic.is_turnip === 1,
    ).length;

    // Définir le seuil de ratio de pépites
    const goldThreshold = 0.5; // Si 50% ou plus de pépites pour afficher l'icône pépite

    // Conditions de choix entre pépite, navet, et note moyenne
    if (goldCount / totalCritics >= goldThreshold && goldCount > turnipCount) {
      return (
        <Stack direction="row" columnGap="5px">
          <GoldNuggetIcon
            width="17px"
            height="17px"
            strokeWidth={4}
            isShadowed={false}
            sx={null}
          />
          <Typography fontSize="0.8em" fontWeight="500" color="#e1a813">
            {`${goldCount}`}
          </Typography>
        </Stack>
      );
    } else if (
      turnipCount / totalCritics >= goldThreshold &&
      turnipCount > goldCount
    ) {
      return (
        <Stack direction="row" columnGap="4px">
          <TurnipIcon
            sx={{
              fontSize: '17px',
            }}
          />
          <Typography fontSize="0.8em" fontWeight="500" color="#d1127b">
            {`${turnipCount}`}
          </Typography>
        </Stack>
      );
    } else if (movie.pepite_vote_average) {
      return (
        <Stack direction="row" columnGap="2px">
          <StarIcon
            sx={{
              fontSize: '18px',
              color:
                homeSectionRef.current === 'friends' ? '#d9ae3c' : '#009696',
            }}
          />
          <Typography
            fontSize="0.8em"
            fontWeight="500"
            sx={{
              color:
                homeSectionRef.current === 'friends' ? '#d9ae3c' : '#0daaaa',
            }}
          >
            {`${formatRating(movie.pepite_vote_average)}`}
          </Typography>
        </Stack>
      );
    } else {
      return '?';
    }
  };

  return (
    <Grid
      item
      xs={3}
      sx={{
        aspectRatio: '2 / 3',
        width: '100%',
        flexBasis: 'calc(25% - 4px)',
        position: 'relative',
        overflow: 'hidden',
        margin: '2px',
        outline: '1px solid #2E2E2E',
      }}
    >
      {isSkeleton ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: '#1b1b1b',
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              homeSectionRef.current === 'popular'
                ? `url(https://image.tmdb.org/t/p/w185${movie.poster_path})`
                : `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.60) 75%, rgba(0,0,0,0.70) 100%), url(https://image.tmdb.org/t/p/w185${movie.poster_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          onClick={() => setShowFilmDetails({ display: true, movie: movie })}
        >
          {movie && homeSectionRef.current !== 'popular' && (
            <Stack
              height="100%"
              justifyContent="flex-end"
              alignItems="flex-start"
              padding="5px 5px 4px 5px"
            >
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
              >
                {homeSectionRef.current === 'upcoming' ? (
                  <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-evenly"
                    alignItems="flex-end"
                  >
                    <CalendarMonthIcon
                      sx={{ fontSize: '18px', color: '#bdbdbd' }}
                    />
                    <Typography
                      fontSize="0.8em"
                      fontWeight="400"
                      lineHeight="1"
                      sx={{ color: '#bdbdbd' }}
                    >
                      {`${formatDate(movie.release_date)}`}
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Stack direction="row">
                      <PersonIcon sx={{ fontSize: '18px', color: '#e4e4e4' }} />
                      <Typography
                        fontSize="0.8em"
                        fontWeight="500"
                        sx={{ color: '#e4e4e4' }}
                      >
                        {`${movie.grouped_critics.length}`}
                      </Typography>
                    </Stack>
                    {getAverageInfos()}
                  </>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default HomeCard;
