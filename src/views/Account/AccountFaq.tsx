// Import des libs externes
import {
  Stack,
  Typography,
} from '@mui/material';

// Import des icônes
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccountFaq = () => {
  return (
    <Stack direction='column' spacing={1} padding='6px 0'>
      <Stack direction='row' height='30px' padding='0 13px' alignItems='center' columnGap='10px' >
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' >
          {'Quel est le but de Pépite ? '}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: '20px'}} />
      </Stack>
      <Stack direction='row' height='30px' padding='0 13px' alignItems='center' columnGap='10px' >
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' >
          {'Quelles sont les fonctionnalités proposées ? '}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: '20px'}} />
      </Stack>
      <Stack direction='row' height='30px' padding='0 13px' alignItems='center' columnGap='10px' >
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' >
          {'Qui peut voir mes critiques ? '}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: '20px'}} />
      </Stack>
      <Stack direction='row' height='30px' padding='0 13px' alignItems='center' columnGap='10px' >
        <Typography fontSize='1em' component='p' fontWeight='bold' color='#094B4B' >
          {'Comment mes données sont elles stockées ? '}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: '20px'}} />
      </Stack>
    </Stack>  
  );
};

export default AccountFaq;