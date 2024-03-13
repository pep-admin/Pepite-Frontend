// Import des libs externes
import { Stack, Typography, TextField } from '@mui/material';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import SendIcon from '@mui/icons-material/Send';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { addCriticComment } from '@utils/request/comments/addCriticComment';
import { addAdviceComment } from '@utils/request/comments/addAdviceComment';

const CommentsInput = ({ criticId, adviceId, getComments, userInfos }) => {
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
      padding="0 10px"
      alignItems="center"
    >
      {/* <Stack
        direction="row"
        width="65px"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <MessageIcon sx={{ fontSize: '2.5em' }} />
      </Stack> */}
      <Stack direction="column" justifyContent="space-between" flexGrow="1">
        <Stack direction="row" columnGap="5px" margin="6px 0 4px 0">
          <Typography
            variant="body2"
            fontWeight="600"
            align="left"
            marginLeft="5px"
          >
            {`${userInfos.first_name} ${userInfos.last_name}`}
          </Typography>
        </Stack>
        <Stack direction="row" marginBottom="6px">
          <TextField
            id="filled-basic"
            ref={inputRef}
            label="Votre commentaire"
            variant="filled"
            value={newComment}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '7px 0 0 7px',
                bgcolor: '#f0f0f0',
                '&:after': {
                  borderBottomColor: '#24A5A5', // Couleur désirée pour la bordure active
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: '#24A5A5',
              },
            }}
            onChange={e => setNewComment(e.target.value)}
          />
          <Stack
            height="38px"
            width="40px"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#24A5A5',
              borderRadius: '0 7px 7px 0',
            }}
            onClick={() => addNewComment()}
          >
            <SendIcon sx={{ color: '#fff' }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

CommentsInput.propTypes = {
  criticId: PropTypes.number,
  adviceId: PropTypes.number,
  getComments: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
};

export default CommentsInput;
