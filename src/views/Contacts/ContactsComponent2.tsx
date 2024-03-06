import { Container, Stack , Typography, Box} from '@mui/material';
import Header from '@utils/components/Header';
import { useRef } from 'react';
import TopContributors from './TopContributors';
import ContactsFriendsFollowed from './ContactsFriendsFollowed';

const ContactsComponent2 = () => {

  const scrollContainerRef = useRef(null);

  return (
    <>
      <Header page={'contacts'} />
      <Container
        sx={{ 
          minHeight: 'calc(100vh - 50px)',
          padding: '0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Stack flexGrow='1' >
          <Stack marginTop='10px' padding='0 4%' >
            <Typography
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Personnes suggérées - Pépites en commun'}
            </Typography>
          </Stack>
          <Stack 
            ref={scrollContainerRef}
            margin='5px 0 15px 4%' 
            sx={{
              overflowX: 'scroll',
            }}
          >
            <TopContributors scrollContainerRef={scrollContainerRef} />
          </Stack>
          <Stack padding='0 4%' >
            <Typography
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Demandes d\'amitié - Amis - Suivis'}
            </Typography>
          </Stack>
          <Box
            width='100vw' 
            marginTop='33px'
            bgcolor='#CAE6E4'
            position='relative'
            display='flex'
            flexDirection='column'
            flexGrow='1'
          >
            <Stack padding='0 4%' marginTop='-27px' width='100%' flexGrow='1'>
              <ContactsFriendsFollowed 
                contactsType={'requests'}
              />
              <ContactsFriendsFollowed 
                contactsType={'friends'}
              />
              <ContactsFriendsFollowed 
                contactsType={'followed'}
              />
            </Stack>            
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ContactsComponent2;