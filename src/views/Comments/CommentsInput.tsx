// Import des libs externes
import {
  Stack,
  Typography,
  // Avatar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des fonctions internes
import { addComment } from '@utils/request/comments/addComment';

// Import des icônes
import { MessageIcon } from '@utils/styledComponent';
import SendIcon from '@mui/icons-material/Send';

// Import du contexte
import { useData } from '@hooks/DataContext';

const CommentsInput = ({ criticId, comments, getComments }) => {
  const { displayType } = useData();

  const [newComment, setNewComment] = useState('');

  const addNewComment = async () => {
    if (newComment === '') return;
    await addComment(criticId, displayType, newComment);
    getComments();
  };

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
      <Stack
        direction="column"
        justifyContent="space-between"
        paddingLeft="8px"
        flexGrow="1"
      >
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
          onChange={e => setNewComment(e.target.value)}
        />
      </Stack>
      <Stack
        height="100%"
        width="40px"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#24A5A5',
          borderRadius: comments.length > 0 ? '0' : '0 0 10px 0',
        }}
        onClick={() => addNewComment()}
      >
        <SendIcon sx={{ color: '#fff' }} />
      </Stack>
    </Stack>
  );
};

CommentsInput.propTypes = {
  criticId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  getComments: PropTypes.func.isRequired,
};

export default CommentsInput;
