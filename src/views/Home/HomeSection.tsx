import { Grid } from '@mui/material';
import HomeCard from './HomeCard';

const HomeSection = ({ movies, homeSectionRef }) => {
  return (
    <Grid container >
      {
        movies.map((movie: any, index: number) => {
          return (
            <HomeCard key={`${movie.id}-${index}`} homeSectionRef={homeSectionRef} movie={movie} />
          )
        })
      }
    </Grid>
  );
};

export default HomeSection;