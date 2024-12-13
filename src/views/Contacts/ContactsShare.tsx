import { Box, Button, Stack, Typography } from '@mui/material';
import { shareLinks } from '@utils/data/shareLinks';

const ContactsShare = () => {
  return (
    <Box
      bgcolor='#021818'
    >
      <Stack
        spacing={4}
        padding='30px 5vw 40px 5vw'
      >
        <Stack>
          <Typography
            component='h2'
            color='text.primary'
            fontSize='1.15em'
            fontWeight='400'
            textTransform='uppercase'
          >
            {'Inviter une personne'}
          </Typography>
          <Typography
            component='h2'
            color='gray'
            fontSize='1em'
            fontWeight='400'
            lineHeight='1'
            marginTop='2px'
          >
            {'Via un lien externe'}
          </Typography>
        </Stack>
        <Stack spacing={6}>
          {
            shareLinks.map((link) => {
              return (
                <Button 
                  key={link.id}
                  sx={{
                    height: '47px',
                    width: '140px',
                    padding: '0 5px',
                    backgroundColor: '#011212',
                    border: '1px solid #2E2E2E',
                    borderRadius: '4px'
                  }}  
                  onClick={() => window.open(link.url.replace('[URL]', encodeURIComponent('https://votreapplication.com')), '_blank')}
                >
                  <Stack 
                    direction='row'
                    width='100%'
                    alignItems='center'  
                    justifyContent='space-evenly'
                  >
                    <img 
                      src={link.logo}
                      alt={`Logo de ${link.name}`}
                      style={{
                        height: '30px',
                        width: '30px',
                      }}
                    />
                    <Typography 
                      fontWeight='300'
                      color='text.primary'
                      textTransform='initial'
                      position='relative'
                      top='1px'
                    >
                      {link.name}
                    </Typography>
                  </Stack>
                  
                </Button>
              );
            })
          }
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactsShare;
