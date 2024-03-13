// Import des libs externes
import { Stack, Typography, Divider } from '@mui/material';
import { Item } from '@utils/components/styledComponent';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des composants enfants
import CommentsInput from './CommentsInput';
import CommentsContent from './CommentsContent';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes internes
import { getAllCriticComments } from '@utils/request/comments/getAllCriticComments';
import { getAllAdviceComments } from '@utils/request/comments/getAllAdviceComments';

const CommentsComponent = ({
  page,
  criticId,
  adviceId,
  comments,
  setComments,
}) => {
  const { displayType } = useData();

  // Infos de l'utilisateur connecté
  const user_infos = JSON.parse(localStorage.getItem('user_infos'));

  const getComments = async () => {
    let response;

    if (criticId) {
      response = await getAllCriticComments(displayType, criticId);
    } else if (adviceId) {
      response = await getAllAdviceComments(displayType, adviceId);
      console.log('les commentaires de critique', response.data);
    } else {
      return;
    }

    setComments(response.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Item marginbottom="15px">
      <Stack direction="row" height="25px" alignItems="center" padding="0 15px">
        <Typography
          variant="body2"
          component="p"
          fontWeight="600"
          lineHeight="10px"
        >
          {'Commentaires'}
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <CommentsInput
          criticId={criticId}
          adviceId={adviceId}
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
  criticId: PropTypes.number,
  adviceId: PropTypes.number,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentsComponent;
