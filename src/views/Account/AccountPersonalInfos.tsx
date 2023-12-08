// Import des libs externes
import {
  Stack,
  Typography,
  Avatar,
  Button,
  LinearProgress,
} from '@mui/material';

// Import des icônes
import EditIcon from '@mui/icons-material/Edit';

const AccountPersonalInfos = () => {
  return (
    <Stack direction='row' height='165px'>
      <Stack 
        direction='column' 
        spacing={1} 
        alignItems='center' 
        justifyContent='center'
        rowGap='5px'
        padding='6px 10px' 
        flexBasis='25%'
      >
        <Avatar
          alt="Remy Sharp"
          src="http://127.0.0.1:5173/images/kate.jpg"
          sx={{
            width: 100,
            height: 100,
            boxShadow: 'inset 0px 0px 0px 3px #fff',
          }}
        />
        <Button variant='contained' sx={{ height: '25px', width: '100%', padding: '0', fontSize: '0.8em', textTransform: 'initial' }}>
          {'Importer une photo'}
        </Button>
      </Stack>
      <Stack 
        direction='column' 
        justifyContent='space-evenly' 
        alignItems='flex-start' 
        padding='10px' 
        flexBasis='75%'
      >
        <Stack direction='row' alignItems='center'>
          <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' marginRight='7px' >
            {'Prénom : '}
            <Typography component='span' fontSize='1em'>
              {'Kate'}
            </Typography>
          </Typography>
          <EditIcon sx={{ fontSize: '17px', color: '#b5b5b5' }} />
        </Stack>
        <Stack direction='row' alignItems='center'>
          <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' marginRight='7px'>
            {'Nom : '}
            <Typography component='span' fontSize='1em'>
              {'Austen'}
            </Typography>
          </Typography>
          <EditIcon sx={{ fontSize: '17px', color: '#b5b5b5' }} />
        </Stack>  
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' marginRight='7px'>
          {'Email : '}
          <Typography component='span' fontSize='1em'>
            {'kate.austen@gmail.com'}
          </Typography>
        </Typography> 
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B'>
          {'Rang : '}
          <Typography component='span' fontSize='1em'>
            {'Maître noteur'}
          </Typography>
        </Typography>
        <LinearProgress
          color="success"
          variant="determinate"
          value={30}
          sx={{
            width: '75%',
          }}
        />
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B'>
          {'Membre depuis le : '}
          <Typography fontSize='1em' component='span'>
            {'04 Février 2022'}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AccountPersonalInfos;