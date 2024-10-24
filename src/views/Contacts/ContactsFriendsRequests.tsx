import { Stack, Typography } from '@mui/material';
import ContactsCard from './ContactsCard';
import CustomBadge from '@utils/components/Wrappers/CustomBadge';

const ContactsFriendsRequests = ({ friendsRequests, onUpdate }) => {
  
  return (
    <Stack spacing={3}>
      <Stack width='fit-content' >
        <CustomBadge
          value={friendsRequests.length} 
          showZero  
          max={99}
          bgColor={'#835F00'}
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
        </CustomBadge>
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