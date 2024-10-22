import { Badge, Box, Button, Stack, Typography } from '@mui/material';
import ContactsCard from './ContactsCard';

const ContactsList = ({ contactsFrom, contactList, onUpdate }) => {
  
  return (
    <Box
      bgcolor='#021818'
      flexGrow={1}
    >
      <Stack
        spacing={3}
        padding='30px 5vw 40px 5vw'
      >
        <Stack width='fit-content' >
          <Badge 
            badgeContent={contactList.length} 
            showZero  
            max={999}
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
              {
                contactsFrom === 'Amis' ?
                  'Mes amis'
                :
                  'Personnes suivies'
              }
            </Typography>
          </Badge>
        </Stack>
        <Stack spacing={4}>
        {
          !contactList.length ?
          <>
            <Typography
              color='#555555'
              lineHeight='1'
            >
              {
                contactsFrom === 'Amis' ?
                  'Vous n\'avez encore ajouté aucun ami.'
                :
                  'Vous ne suivez encore aucun utilisateur.'
              }
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
                contactsFrom === 'Amis' ?
                  'Ajouter des amis'
                :
                  'Suivre des utilisateurs'
              }
            </Button>
          </>
          :
          contactList.map((user, index) => {
            return(
              <ContactsCard key={user.id} user={user} isLastCard={index === contactList.length - 1} onUpdate={onUpdate}/>
            )
          })
        }
      </Stack>
      </Stack>
    </Box>
  );
};

export default ContactsList;