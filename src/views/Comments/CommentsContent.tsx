// Import des libs externes
import { Stack, Typography, Divider, Avatar } from '@mui/material';
import { MessageIcon } from '@utils/styledComponent';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { convertDate } from '@utils/functions/convertDate';

// Import des icônes
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ModifyOrDelete from '@utils/ModifyOrDelete';

// Import des requêtes internes
import { addCommentLike } from '@utils/request/comments/addCommentlike';
import { getCommentsLikesNumber } from '@utils/request/comments/getCommentsLikesNumber';
import { checkLikeStatusComment } from '@utils/request/comments/checkLikeStatusComment';
import { removeCommentLike } from '@utils/request/comments/removeCommentLike';

const CommentsContent = ({ comments, comment, setInfos }) => {
  const { displayType } = useData();

  const [isModify, setIsModify] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);

  // Compte le nombre de likes par critique
  const fetchLikesNumber = async () => {
    const response = await getCommentsLikesNumber(comment.id, displayType);
    setLikesNumber(response);
  };

  // Vérifie si l'utilisateur a déjà liké des commentaires
  const checkLikesStatus = async () => {
    const response = await checkLikeStatusComment(comment.id, displayType);
    setHasLiked(response);
  };

  // Gérer le clic sur l'icône de like
  const toggleLike = async commentId => {
    setHasLiked(!hasLiked);
    try {
      if (hasLiked) {
        removeCommentLike(commentId, displayType);
      } else {
        addCommentLike(commentId, displayType);
      }
      fetchLikesNumber();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like', error);
      setHasLiked(hasLiked); // Revenir en arrière si l'action échoue
    }
  };

  useEffect(() => {
    fetchLikesNumber();
    checkLikesStatus();
  }, [hasLiked]);

  return (
    <>
      <Divider sx={{ margin: '0px 0px 1px 0px' }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        minHeight="67px"
        paddingLeft="14px"
        margin="5px 0"
      >
        <Stack direction="row" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="http://127.0.0.1:5173/images/kate.jpg"
            sx={{
              width: 50,
              height: 50,
              boxShadow: 'inset 0px 0px 0px 3px #fff',
              borderRadius: 0,
            }}
          />
          <MessageIcon
            sx={{
              fontSize: '1.2em',
              position: 'relative',
              bottom: '16px',
              right: '8px',
            }}
          />
        </Stack>
        <Stack direction="column" flexGrow={1}>
          <Stack
            padding="5px 5px 5px 15px"
            sx={{
              backgroundColor: '#F1F1F1',
              borderRadius: '10px 0 0 0',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography
                component="h5"
                align="left"
                fontSize="1em"
                fontWeight="bold"
              >
                {'Kate Austen'}
              </Typography>
              <ModifyOrDelete
                infos={comments}
                setInfos={setInfos}
                isModify={isModify}
                setIsModify={setIsModify}
              />
            </Stack>
            <Typography component="p" variant="body2" align="left">
              {`${comment.text}`}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            height="20px"
            padding="0 15px"
            columnGap="25px"
            sx={{
              backgroundColor: '#E4E4E4',
              borderRadius: '0 0 0 10px',
            }}
          >
            <Typography variant="body2" component="p" sx={{ color: 'gray' }}>
              {`${convertDate(comment.created_date)}`}
            </Typography>
            <Stack direction="row" alignItems="center" columnGap="5px">
              <ThumbUpTwoToneIcon
                color={hasLiked ? 'success' : 'inherit'}
                sx={{ fontSize: '18px' }}
                onClick={() => toggleLike(comment.id)}
              />
              <Typography variant="body2" component="p" fontWeight="bold">
                {likesNumber}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

CommentsContent.propTypes = {
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  setInfos: PropTypes.func.isRequired,
};

export default CommentsContent;
