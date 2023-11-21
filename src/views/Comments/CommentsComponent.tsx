// Import des libs externes
import { Stack, Typography, Divider, Avatar } from '@mui/material';
import { Item, LikeIcon, MessageIcon } from '@utils/styledComponent';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants enfants
import CommentsInput from './CommentsInput';
import { getAllCriticComments } from '@utils/request/critics/getComments';

// Import du contexte
import { useData } from '@hooks/DataContext';

const CommentsComponent = ({ criticId }) => {
  const { displayType } = useData();

  const [comments, setComments] = useState([]);

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
              <React.Fragment key={comment.id}>
                <Divider sx={{ margin: '0px 0px 1px 0px' }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  minHeight="67px"
                  paddingLeft="14px"
                >
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      alt="Remy Sharp"
                      src="http://127.0.0.1:5173/images/kate.jpg"
                      sx={{
                        width: 50,
                        height: 50,
                        boxShadow: 'inset 0px 0px 0px 3px #fff',
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
                  <Stack
                    flexGrow="1"
                    margin="5px 0 6px 2px"
                    padding="5px 15px"
                    sx={{
                      backgroundColor: '#F1F1F1',
                      borderRadius: '10px 0 0 10px',
                    }}
                  >
                    <Typography
                      component="h5"
                      align="left"
                      fontSize="1em"
                      fontWeight="bold"
                    >
                      {'Kate Austen'}
                    </Typography>
                    <Typography component="p" variant="body2" align="left">
                      {`${comment.text}`}
                    </Typography>
                  </Stack>
                  <Stack
                    width="40px"
                    margin="6px 0"
                    sx={{ backgroundColor: '#E4E4E4' }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="body2" component="p" fontWeight="bold">
                      {'0'}
                    </Typography>
                    <LikeIcon sx={{ fontSize: '19px' }} />
                  </Stack>
                </Stack>
              </React.Fragment>
            );
          })
        : null}
    </Item>
  );
};

CommentsComponent.propTypes = {
  criticId: PropTypes.number.isRequired,
};

export default CommentsComponent;
