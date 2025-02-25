import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CustomBadge from '@utils/components/Wrappers/CustomBadge';

const FilmReviews = ({ reviewsFrom }) => {
  return (
    <Box bgcolor={reviewsFrom === 'amis' ? '#021E1E' : '#021818'}>
      <Container
        sx={{
          paddingLeft: '5vw',
          paddingRight: '5vw',
        }}
      >
        <Stack spacing={3} padding="30px 0 40px 0">
          <Stack width="fit-content">
            <CustomBadge
              value={[1]}
              max={999}
              showZero={false}
              bgColor={reviewsFrom === 'amis' ? '#835F00' : '#0c6666'}
            >
              <Typography
                component="h2"
                color="text.primary"
                fontSize="1.15em"
                fontWeight="400"
                textTransform="uppercase"
              >
                {`NOTATIONS - ${reviewsFrom}`}
              </Typography>
            </CustomBadge>
          </Stack>
          <Stack spacing={4}>
            <Typography color="#555555" lineHeight="1">
              {`Aucun ${
                reviewsFrom === 'amis' ? 'ami' : 'suivi'
              } n'a encore noté ce film.`}
            </Typography>
            <Button
              sx={{
                height: '33px',
                width: 'fit-content',
                padding: '7px 12px 5px 12px',
                color: '#f1f1f1',
                outline: '1px solid #2D2D2D',
                fontSize: '0.75em',
                fontWeight: '400',
              }}
            >
              {reviewsFrom === 'amis'
                ? 'Ajouter des amis'
                : 'Suivre des utilisateurs'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FilmReviews;
