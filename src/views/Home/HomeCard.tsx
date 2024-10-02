import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const HomeCard = ({ homeSectionRef, movie }) => {
  const isPlaceholder = !movie.id; // Si l'objet film n'a pas d'ID, c'est un placeholder

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-'); // Séparer l'année, le mois et le jour
    return `${day}.${month}.${year.slice(2)}`; // Réorganiser en 18.10.24 (jour.mois.année)
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
      {isPlaceholder ? (
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
        >
          {movie && homeSectionRef.current !== 'popular' && (
            <Stack
              height="100%"
              justifyContent="flex-end"
              alignItems="flex-start"
              padding="5px 5px 4px 5px"
            >
              {/* <Avatar 
                variant='rounded'
                alt={`Photo de profil de ${movie.grouped_critics[0].first_name} ${movie.grouped_critics[0].last_name}`} 
                src={`${apiBaseUrl}/uploads/${movie.grouped_critics[0].file_path}`} 
                sx={{
                  height: '50px',
                  width: '50px',
                  border: '1px solid #040404'
                }}
              /> */}
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
                    <Stack direction="row" columnGap="1px">
                      <StarIcon
                        sx={{
                          fontSize: '18px',
                          color:
                            homeSectionRef.current === 'friends'
                              ? '#d9ae3c'
                              : '#009696',
                        }}
                      />
                      <Typography
                        fontSize="0.8em"
                        fontWeight="500"
                        sx={{
                          color:
                            homeSectionRef.current === 'friends'
                              ? '#d9ae3c'
                              : '#009696',
                        }}
                      >
                        {`${movie.pepite_vote_average}`}
                      </Typography>
                    </Stack>
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
