// Import des libs externes
import { Stack, Typography, Divider, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import UserAvatar from '@utils/components/UserAvatar';
import ModifyOrDelete from '@utils/components/ModifyOrDelete';
import LikesFooter from '@views/CriticAdvices/LikesFooter';
import GoldFooter from '@views/CriticAdvices/GoldFooter';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { convertDate } from '@utils/functions/convertDate';

// Import des icônes
import EditIcon from '@mui/icons-material/Edit';

// Import des requêtes internes
import { modifyCriticComment } from '@utils/request/comments/modifyCriticComment';
import { getUser } from '@utils/request/users/getUser';
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
  isFirst,
}) => {
  const { displayType } = useData();

  const [isModify, setIsModify] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(comment.text);
  const [commentUserInfos, setCommentUserInfos] = useState<User | null>(null);

  const fetchUserInfos = async () => {
    const commentUser = await getUser(comment.user_id);
    setCommentUserInfos(commentUser);
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
    fetchUserInfos();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        minHeight="67px"
        padding="0 10px"
        flexShrink="0"
        margin={isFirst ? '0 0 10px 0' : '10px 0'}
      >
        <Stack direction="column" flexGrow={1}>
          <Stack
            padding="5px 10px"
            sx={{
              backgroundColor: '#f7f7f7',
              borderRadius: '10px 10px 0 0',
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="5px"
            >
              <Stack direction="row" columnGap="10px">
                {commentUserInfos && (
                  <UserAvatar
                    variant={'circle'}
                    userInfos={commentUserInfos}
                    picWidth={35}
                    picHeight={35}
                    isOutlined={false}
                    outlineWidth={null}
                    relationType={null}
                    redirection={true}
                  />
                )}
                <Stack>
                  <Typography variant="body2" align="left" fontWeight="600">
                    {`${commentUserInfos?.first_name} ${commentUserInfos?.last_name}`}
                  </Typography>
                  <Typography align="left" fontSize="0.8em" color="#9B9B9B">
                    {`le ${convertDate(comment.created_date)}`}
                  </Typography>
                </Stack>
              </Stack>
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
            <Divider
              sx={{
                borderColor: '#e9e9e9',
              }}
            />
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
              <Typography variant="body2" align="left" padding="5px 10px">
                {`${comment.text}`}
              </Typography>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            padding="5px 15px"
            columnGap="25px"
            sx={{
              backgroundColor: '#ececec',
              borderRadius: '0 0 10px 10px',
            }}
          >
            <LikesFooter from={'comment'} infos={comment} />
            <GoldFooter from={'comment'} infos={comment} />
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
  isFirst: PropTypes.bool.isRequired,
};

export default CommentsContent;
