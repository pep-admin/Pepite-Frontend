// Import des libs externes
import { Stack, Typography, TextField } from '@mui/material';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import { MessageIcon } from '@utils/components/styledComponent';
import SendIcon from '@mui/icons-material/Send';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { addCriticComment } from '@utils/request/comments/addCriticComment';
import { addAdviceComment } from '@utils/request/comments/addAdviceComment';

const CommentsInput = ({
  criticId,
  adviceId,
  comments,
  getComments,
  userInfos,
}) => {
  const { displayType } = useData();

  const [newComment, setNewComment] = useState('');
  const inputRef = useRef(null);

  const addNewComment = async () => {
    if (newComment === '') return;

    if (criticId) {
      await addCriticComment(criticId, displayType, newComment);
    } else if (adviceId) {
      await addAdviceComment(adviceId, displayType, newComment);
    } else {
      return;
    }

    setNewComment(''); // Réinitialise le champ de saisie
    inputRef.current?.blur(); // Retire le focus de l'input
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
          {`${userInfos.first_name} ${userInfos.last_name}`}
        </Typography>
        <TextField
          id="filled-basic"
          ref={inputRef}
          label="Votre commentaire"
          variant="filled"
          value={newComment}
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
  criticId: PropTypes.number,
  adviceId: PropTypes.number,
  comments: PropTypes.array.isRequired,
  getComments: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
};

export default CommentsInput;
