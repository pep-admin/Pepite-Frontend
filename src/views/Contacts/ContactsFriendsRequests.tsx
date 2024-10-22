import { Badge, Stack, Typography } from '@mui/material';
import ContactsCard from './ContactsCard';

const ContactsFriendsRequests = ({ friendsRequests, onUpdate }) => {
  
  return (
    <Stack spacing={3}>
      <Stack width='fit-content' >
        <Badge 
          badgeContent={friendsRequests.length} 
          showZero  
          max={99}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#835F00',
              color: '#fff',
              fontSize: '0.9em',
              right: '-19px',
            }
          }}
        >
          <Typography
            component='h2'
            color='text.primary'
            fontSize='1.15em'
            fontWeight='400'
            textTransform='uppercase'
          >
            {`DEMANDES D'AMITIÉ`}
          </Typography>
        </Badge>
      </Stack>
      <Stack spacing={4}>
        {
          !friendsRequests.length ?
            <Typography
              color='#555555'
              lineHeight='1'
            >
              {`Aucune demande d'amitié pour l'instant.`}
            </Typography>
          :
          friendsRequests.map((user, index) => {
            return(
              <ContactsCard key={user.id} user={user} isLastCard={index === friendsRequests.length - 1} onUpdate={onUpdate}/>
            )
          })
        }
      </Stack>
    </Stack>
  );
};

export default ContactsFriendsRequests;