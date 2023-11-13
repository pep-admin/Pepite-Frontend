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
      padding="0 10px"
      margin="12px 0"
      justifyContent="space-between"
    >
      <Stack direction="row">
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
            bottom: '4px',
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
      <Stack height="30px" justifyContent="center" alignSelf="center">
        <SendIcon />
      </Stack>
    </Stack>
  );
};

export default CommentsInput;
