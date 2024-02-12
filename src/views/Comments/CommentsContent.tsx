// Import des libs externes
import { Stack, Typography, Divider, TextField } from '@mui/material';
import { MessageIcon } from '@utils/components/styledComponent';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import UserAvatar from '@utils/components/UserAvatar';
import ModifyOrDelete from '@utils/components/ModifyOrDelete';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { convertDate } from '@utils/functions/convertDate';

// Import des icônes
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import EditIcon from '@mui/icons-material/Edit';

// Import des requêtes internes
import { addCriticCommentLike } from '@utils/request/comments/addCriticCommentLike';
import { getCommentsCriticLikesNumber } from '@utils/request/comments/getCommentsCriticLikesNumber';
import { checkCriticCommentLikeStatus } from '@utils/request/comments/checkCriticCommentLikeStatus';
import { removeCriticCommentLike } from '@utils/request/comments/removeCriticCommentLike';
import { modifyCriticComment } from '@utils/request/comments/modifyCriticComment';
import { getUser } from '@utils/request/users/getUser';
import { addAdviceCommentLike } from '@utils/request/comments/addAdviceCommentLike';
import { getCommentsAdviceLikesNumber } from '@utils/request/comments/getCommentsAdviceLikesNumber';
import { checkAdviceCommentLikeStatus } from '@utils/request/comments/checkAdviceCommentLikeStatus';
import { removeAdviceCommentLike } from '@utils/request/comments/removeAdviceCommentLike';
import { modifyAdviceComment } from '@utils/request/comments/modifyAdviceComment';

interface Picture {
  id: number;
  user_id: number;
  filePath: string;
  uploaded_at: string;
  isActive: number;
}

interface User {
  coverPics: Picture[];
  create_datetime: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  last_login_date: string;
  profilPics: Picture[];
  rank: string;
}

const CommentsContent = ({
  page,
  comment,
  setData,
  getComments,
  userInfos,
}) => {
  const { displayType } = useData();

  const [isModify, setIsModify] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [commentUpdated, setCommentUpdated] = useState(comment.text);
  const [commentUserInfos, setCommentUserInfos] = useState<User | null>(null);

  const fetchUserInfos = async () => {
    const commentUser = await getUser(comment.user_id);
    setCommentUserInfos(commentUser);
  };

  // Compte le nombre de likes par critique
  const fetchLikesNumber = async () => {
    let response;

    if ('critic_id' in comment) {
      response = await getCommentsCriticLikesNumber(comment.id, displayType);
    } else if ('advice_id' in comment) {
      response = await getCommentsAdviceLikesNumber(comment.id, displayType);
    } else {
      return;
    }

    setLikesNumber(response);
  };

  // Vérifie si l'utilisateur a déjà liké des commentaires
  const checkLikesStatus = async () => {
    let response;

    if ('critic_id' in comment) {
      response = await checkCriticCommentLikeStatus(comment.id, displayType);
    } else if ('advice_id' in comment) {
      response = await checkAdviceCommentLikeStatus(comment.id, displayType);
    } else {
      return;
    }

    setHasLiked(response);
  };

  // Gérer le clic sur l'icône de like
  const toggleLike = async commentId => {
    setHasLiked(!hasLiked);
    try {
      if (hasLiked) {
        if ('critic_id' in comment) {
          await removeCriticCommentLike(commentId, displayType);
        } else if ('advice_id' in comment) {
          await removeAdviceCommentLike(commentId, displayType);
        } else {
          return;
        }
      } else {
        if ('critic_id' in comment) {
          await addCriticCommentLike(commentId, displayType);
        } else if ('advice_id' in comment) {
          await addAdviceCommentLike(commentId, displayType);
        } else {
          return;
        }
      }
      fetchLikesNumber();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like', error);
      setHasLiked(hasLiked); // Revenir en arrière si l'action échoue
    }
  };

  const updateComment = async commentId => {
    try {
      if ('critic_id' in comment) {
        await modifyCriticComment(commentId, displayType, commentUpdated);
      } else if ('advice_id' in comment) {
        await modifyAdviceComment(commentId, displayType, commentUpdated);
      } else {
        return;
      }
      getComments();
      setIsModify(false);
    } catch (error) {
      console.log('erreur dans la modification', error);
    }
  };

  useEffect(() => {
    fetchLikesNumber();
    checkLikesStatus();
    fetchUserInfos();
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
          {commentUserInfos && (
            <UserAvatar
              variant={'square'}
              userInfos={commentUserInfos}
              picWidth={50}
              picHeight={50}
              isOutlined={false}
              outlineWidth={null}
              relationType={null}
              sx={{ borderRadius: '0' }}
            />
          )}
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
                {`${commentUserInfos?.first_name} ${commentUserInfos?.last_name}`}
              </Typography>
              {userInfos.id === comment.user_id ? (
                <ModifyOrDelete
                  page={page}
                  parent={'comment'}
                  infos={comment}
                  setData={setData}
                  isModify={isModify}
                  setIsModify={setIsModify}
                />
              ) : null}
            </Stack>
            {isModify ? (
              <Stack direction="row" margin="6px 0">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  value={`${commentUpdated}`}
                  onChange={e => setCommentUpdated(e.target.value)}
                  sx={{
                    flexGrow: '1',
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: '2px 0 0 2px',
                    },
                  }}
                />
                <Stack
                  height="100%"
                  width="30px"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor: '#24A5A5',
                    borderRadius: '0 2px 2px 0',
                  }}
                >
                  <EditIcon
                    sx={{ color: '#fff' }}
                    onClick={() => updateComment(comment.id)}
                  />
                </Stack>
              </Stack>
            ) : (
              <Typography component="p" variant="body2" align="left">
                {`${comment.text}`}
              </Typography>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            height="25px"
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
  page: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
};

export default CommentsContent;
