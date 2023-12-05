// Import des libs externes
import { Stack, Typography, Divider } from '@mui/material';
import { Item } from '@utils/styledComponent';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des composants enfants
import CommentsInput from './CommentsInput';
import CommentsContent from './CommentsContent';

// Import des requêtes internes
import { getAllCriticComments } from '@utils/request/comments/getComments';

// Import du contexte
import { useData } from '@hooks/DataContext';

const CommentsComponent = ({ criticId, comments, setComments }) => {
  const { displayType } = useData();

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
        />
      </Stack>
      {comments.length > 0
        ? comments.map(comment => {
            return (
              <CommentsContent
                key={comment.id}
                comment={comment}
                setInfos={setComments}
                getComments={getComments}
              />
            );
          })
        : null}
    </Item>
  );
};

CommentsComponent.propTypes = {
  criticId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentsComponent;
