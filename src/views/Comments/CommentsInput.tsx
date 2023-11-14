// Import des libs externes
import {
  Stack,
  Typography,
  // Avatar,
  TextField,
} from '@mui/material';
import { MessageIcon } from '@utils/styledComponent';
import SendIcon from '@mui/icons-material/Send';

const CommentsInput = () => {
  return (
    <Stack
      direction="row"
      position="relative"
      borderRadius="10px"
      flexGrow="1"
      paddingLeft="10px"
      alignItems="center"
    >
      <Stack
        direction="row"
        width="65px"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <MessageIcon sx={{ fontSize: '2.5em' }} />
      </Stack>
      <Stack direction="column" justifyContent="space-between" flexGrow="1">
        <Typography
          component="h5"
          fontWeight="bold"
          align="left"
          width="80%"
          fontSize="1em"
          paddingLeft="12px"
        >
          {'Kate Austen'}
        </Typography>
        <TextField
          id="filled-basic"
          label="Votre commentaire"
          variant="filled"
          sx={{
            width: '80%',
          }}
        />
      </Stack>
      <Stack
        height="100%"
        width="40px"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#24A5A5', borderRadius: '0 0 10px 0' }}
      >
        <SendIcon sx={{ color: '#fff' }} />
      </Stack>
    </Stack>
  );
};

export default CommentsInput;
