// Import des libs externes
import { Stack, Typography, TextField, Avatar } from '@mui/material';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { addCriticComment } from '@utils/request/comments/addCriticComment';
import { addAdviceComment } from '@utils/request/comments/addAdviceComment';

const CommentsInput = ({
  criticId,
  adviceId,
  getComments,
  infos,
  setShowInput,
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
      padding="0 10px"
      alignItems="center"
    >
      <Avatar
        variant={'square'}
        alt={`Affiche de ${infos.title}`}
        src={`https://image.tmdb.org/t/p/w500/${infos.poster_path}`}
        sx={{
          width: 95,
          height: 140,
          borderRadius: '4px',
        }}
      />
      <Stack
        height="140px"
        direction="column"
        justifyContent="space-between"
        flexGrow="1"
        paddingLeft="10px"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom="4px"
        >
          <Typography variant="body2" fontWeight="600" align="left">
            {`${infos.title}`}
          </Typography>
          <CloseIcon
            fontSize="small"
            sx={{
              marginRight: '4px',
            }}
            onClick={() => setShowInput(false)}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" flexGrow="1">
          <TextField
            id="filled-basic"
            ref={inputRef}
            label="Votre commentaire"
            variant="filled"
            value={newComment}
            fullWidth
            multiline
            autoComplete="off"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '7px',
                flexGrow: '1',
                bgcolor: '#f0f0f0',
                alignItems: 'flex-start',
                '&:after': {
                  borderBottomColor: '#24A5A5',
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: '#24A5A5',
              },
            }}
            onChange={e => setNewComment(e.target.value)}
          />
          <Stack width="30px" marginLeft="14px" justifyContent="center">
            <SendIcon
              sx={{ color: '#383838' }}
              onClick={() => addNewComment()}
            />
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
  infos: PropTypes.object.isRequired,
  setShowInput: PropTypes.func.isRequired,
};

export default CommentsInput;
