import { Badge, Box, Button, Container, Stack, Typography } from '@mui/material';

const FilmReviews = ({ reviewsFrom }) => {
  return (
    <Box
      bgcolor={ 
        reviewsFrom === 'amis' ? 
          '#021E1E'
          :
          '#021818'
        }
    >
      <Container
        sx={{
          paddingLeft: '5vw',
          paddingRight: '5vw'
        }}
      >
        <Stack
          spacing={2}
          padding='20px 0 40px 0'
        >
          <Stack width='fit-content' >
            <Badge 
              badgeContent={0} 
              showZero  
              max={99}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: reviewsFrom === 'amis' ? '#835F00' : '#0c6666',
                  color: '#fff',
                  fontFamily: 'Pragati Narrow, sans-serif',
                  fontSize: '0.95em',
                  right: '-17px',
                }
              }}
            >
              <Typography
                component='h2'
                color='text.primary'
                fontSize='1.3em'
                fontWeight='400'
                textTransform='uppercase'
              >
                {`NOTATIONS - ${reviewsFrom}`}
              </Typography>
            </Badge>
          </Stack>
          <Stack spacing={2}>
            <Typography
              color='#555555'
            >
              {`Aucun ${reviewsFrom === 'amis' ? 'ami' : 'suivi'} n'a encore noté ce film.`}
            </Typography>
            <Button
              sx={{
                height: '33px',
                width: 'fit-content',
                padding: '7px 12px 5px 12px',
                color: '#f1f1f1',
                outline: '1px solid #2D2D2D',
                fontSize: '0.75em',
                fontWeight: '400'
              }}
            >
              {
                reviewsFrom === 'amis' ?
                  'Ajouter des amis'
                :
                  'Suivre des utilisateurs'
              }
            </Button>
          </Stack>
        </Stack>
        
      </Container>
    </Box>
  );
};

export default FilmReviews;