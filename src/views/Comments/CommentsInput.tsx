// Import des libs externes
import { Stack, Typography, Avatar, TextField } from '@mui/material';
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
      justifyContent="space-between"
    >
      <Stack direction="row" margin="6px 0">
        <Avatar
          variant="square"
          alt="Photo de Kate"
          src="http://127.0.0.1:5173/images/kate.jpg"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '10px',
          }}
        />
        <MessageIcon
          sx={{
            height: '17px',
            width: '20px',
            position: 'relative',
            bottom: '5px',
            right: '8px',
          }}
        />
      </Stack>
      <Stack direction="column" justifyContent="space-between">
        <Typography
          component="h5"
          fontWeight="bold"
          align="left"
          fontSize="1em"
          paddingLeft="12px"
        >
          {'Kate Austen'}
        </Typography>
        <TextField
          id="filled-basic"
          label="Votre commentaire"
          variant="filled"
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
