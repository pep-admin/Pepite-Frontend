import { Grid } from '@mui/material';
import HomeCard from './HomeCard';
import { Movie } from 'types/interface';

const HomeSection = ({ movies, homeSectionRef, setShowFilmDetails }) => {
  return (
    <Grid container>
      {movies.map((movie: Movie, index: number) => {
        return (
          <HomeCard
            key={`${movie.id}-${index}`}
            homeSectionRef={homeSectionRef}
            movie={movie}
            setShowFilmDetails={setShowFilmDetails}
          />
        );
      })}
    </Grid>
  );
};

export default HomeSection;
