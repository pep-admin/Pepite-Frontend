// Import des libs externes
import { Stack, Typography, Divider, Avatar } from '@mui/material';
import { Item, MessageIcon } from '@utils/styledComponent';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants enfants
import CommentsInput from './CommentsInput';
import { getAllCriticComments } from '@utils/request/critics/getComments';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { convertDate } from '@utils/functions/convertDate';

// Import des icônes
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ModifyOrDelete from '@utils/ModifyOrDelete';

const CommentsComponent = ({ criticId }) => {
  const { displayType } = useData();

  const [comments, setComments] = useState([]);
  const [isModify, setIsModify] = useState(false);

  const getComments = async () => {
    const response = await getAllCriticComments(displayType, criticId);
    setComments(response.data);
  };

  // const updateComment = async () => {
  //   try {
  //     const criticId = criticInfos.critic_id;
  //     const userId = localStorage.getItem('user_id');
  //     await modifyCritic(
  //       criticId,
  //       displayType,
  //       newRating,
  //       newCriticText,
  //       isGoldNugget,
  //     );

  //     setNewCriticError({ error: false, message: null });
  //     setNewCriticInfo({ info: false, message: null });
  //     setNewCriticSuccess({
  //       success: true,
  //       message: 'Critique modifiée avec succès !',
  //     });

  //     const newCriticsData = await getAllCriticsOfUser(userId, displayType);
  //     setUserCritics(newCriticsData);
  //     setIsModify(false);
  //   } catch (error) {
  //     console.log('erreur dans la modification', error);
  //     setNewCriticError({ error: true, message: error });
  //     setNewCriticInfo({ info: false, message: null });
  //     setNewCriticSuccess({ success: false, message: null });
  //   }
  // };

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
                          criticInfos={comments}
                          setUserCritics={setComments}
                          isModify={isModify}
                          setIsModify={setIsModify}
                        />
                        {/* <EditNoteIcon
                          sx={{ fontSize: '20px', cursor: 'pointer' }}
                          // onClick={handleToolsMenu}
                        /> */}
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
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ color: 'gray' }}
                      >
                        {`${convertDate(comment.created_date)}`}
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        columnGap="5px"
                      >
                        <ThumbUpTwoToneIcon
                          // color={hasLiked ? 'success' : 'inherit'}
                          sx={{ fontSize: '18px', color: '#606060' }}
                          // onClick={toggleLike}
                        />
                        <Typography
                          variant="body2"
                          component="p"
                          fontWeight="bold"
                        >
                          {'0'}
                        </Typography>
                      </Stack>
                    </Stack>
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
