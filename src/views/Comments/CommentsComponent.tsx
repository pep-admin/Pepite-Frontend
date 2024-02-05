// Import des libs externes
import { Stack, Typography, Divider } from '@mui/material';
import { Item } from '@utils/components/styledComponent';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des composants enfants
import CommentsInput from './CommentsInput';
import CommentsContent from './CommentsContent';

// Import des requêtes internes
import { getAllCriticComments } from '@utils/request/comments/getComments';

// Import du contexte
import { useData } from '@hooks/DataContext';

const CommentsComponent = ({ page, criticId, comments, setComments }) => {
  const { displayType } = useData();

  // Infos de l'utilisateur connecté
  const user_infos = JSON.parse(localStorage.getItem('user_infos'));

  const getComments = async () => {
    const response = await getAllCriticComments(displayType, criticId);
    setComments(response.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Item margintop="6px">
      <Stack direction="row" height="25px" alignItems="center" padding="0 10px">
        <Typography
          variant="body2"
          component="p"
          fontWeight="bold"
          lineHeight="10px"
        >
          {'Commentaires'}
        </Typography>
      </Stack>
      <Divider />
      <Stack height="67px">
        <CommentsInput
          criticId={criticId}
          comments={comments}
          getComments={getComments}
          userInfos={user_infos}
        />
      </Stack>
      {comments.length > 0
        ? comments.map(comment => {
            return (
              <CommentsContent
                key={comment.id}
                page={page}
                comment={comment}
                setData={setComments}
                getComments={getComments}
                userInfos={user_infos}
              />
            );
          })
        : null}
    </Item>
  );
};

CommentsComponent.propTypes = {
  page: PropTypes.string.isRequired,
  criticId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentsComponent;
