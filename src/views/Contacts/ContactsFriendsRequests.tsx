import { Badge, Stack, Typography } from '@mui/material';

const ContactsFriendsRequests = ({ friendsRequests, loadingContacts }) => {
  return (
    <Stack spacing={3}>
      <Stack width='fit-content' >
        <Badge 
          badgeContent={0} 
          showZero  
          max={99}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#835F00',
              color: '#fff',
              fontSize: '0.9em',
              right: '-17px',
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
          loadingContacts && !friendsRequests.length ?
            <Typography
              color='#555555'
              lineHeight='1'
            >
              {`Aucune demande d'amitié pour l'instant.`}
            </Typography>
          :
            <Typography
              color='#555555'
              lineHeight='1'
            >
              {`Nouvelles demandes`}
            </Typography>
        }
      </Stack>
    </Stack>
  );
};

export default ContactsFriendsRequests;