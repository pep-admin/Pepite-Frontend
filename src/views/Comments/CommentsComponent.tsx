// Import des libs externes
import { Stack, Typography, Divider, Skeleton, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
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
  infos,
}) => {
  const { displayType } = useData();

  const [showInput, setShowInput] = useState(false);

  // Infos de l'utilisateur connecté
  const user_infos = JSON.parse(localStorage.getItem('user_infos'));

  const getComments = async () => {
    let response;

    if (criticId) {
      response = await getAllCriticComments(displayType, criticId);
    } else if (adviceId) {
      response = await getAllAdviceComments(displayType, adviceId);
    } else {
      return;
    }

    setComments(response.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Stack>
      <Stack alignItems="center" rowGap="20px">
        <Skeleton
          variant="rectangular"
          height={7}
          width={70}
          animation={false}
          sx={{
            borderRadius: '7px',
            marginTop: '5px',
          }}
        />
        <Typography
          variant="body2"
          component="p"
          fontWeight="600"
          lineHeight="10px"
          marginBottom="20px"
        >
          {'Commentaires'}
        </Typography>
      </Stack>
      <Divider
        sx={{
          borderColor: '#e9e9e9',
        }}
      />
      <Stack
        sx={{
          overflow: 'auto', // Active le défilement si le contenu dépasse la hauteur
          maxHeight: 'calc(75vh - 63px)', // Ajustez la hauteur maximale selon vos besoins
        }}
      >
        <Stack margin="15px 0">
          <Collapse in={showInput}>
            <CommentsInput
              criticId={criticId}
              adviceId={adviceId}
              getComments={getComments}
              infos={infos}
              setShowInput={setShowInput}
            />
          </Collapse>
          {!showInput && (
            <Typography
              padding="0 12px"
              color="#adadad"
              onClick={() => setShowInput(true)}
            >
              {'Écrire un commentaire'}
            </Typography>
          )}
        </Stack>
        {comments.length > 0
          ? comments.map((comment, index) => {
              return (
                <CommentsContent
                  key={comment.id}
                  page={page}
                  comment={comment}
                  setData={setComments}
                  getComments={getComments}
                  userInfos={user_infos}
                  isFirst={index === 0}
                />
              );
            })
          : null}
      </Stack>
    </Stack>
  );
};

CommentsComponent.propTypes = {
  page: PropTypes.string.isRequired,
  criticId: PropTypes.number,
  adviceId: PropTypes.number,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  infos: PropTypes.object.isRequired,
};

export default CommentsComponent;
