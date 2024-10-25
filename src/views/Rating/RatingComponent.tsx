import { Container } from '@mui/material';
import RatingSearch from './RatingSearch';

const RatingComponent = () => {

  return (
    <Container
      id="scrollableContainer"
      // ref={scrollableContainerRef}
      maxWidth="xl"
      sx={{
        padding: '0 5vw',
        margin: '0',
        backgroundColor: '#011212',
        height: 'calc(100vh - 109px)',
        overflow: 'auto',
      }}
    >
      <RatingSearch />
    </Container>
  );
};

export default RatingComponent;