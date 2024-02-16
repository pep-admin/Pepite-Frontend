// Import des libs externes
import {
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import FriendRequestBtn from '@utils/components/FriendRequestBtn';

const SuggestionsCard = ({
  page,
  user,
  isLast,
  friendsList,
  followedList,
  getFriendsRequests,
  getFriends,
  getFollowed,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          height: '100%',
          width: 95,
          flexShrink: 0,
          boxShadow: 'none',
          position: 'relative',
        }}
      >
        <CardActionArea
          sx={{ height: '95px' }}
          onClick={() => {
            navigate(`/profil/${user.id}`);
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={
              user.file_path
                ? `${apiBaseUrl}/Uploads/${user.file_path}`
                : `${assetsBaseUrl}/images/default_profil_pic.png`
            }
            alt={`Photo de profil de ${user.first_name} ${user.last_name}`}
            sx={{
              borderRadius: '10px',
              boxShadow:
                '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
            }}
          />
        </CardActionArea>
        <CardContent
          sx={{
            height: '23px',
            width: '100%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='body2'
            gutterBottom
            component="h4"
            margin="0"
            paddingLeft="8px"
            maxWidth="100%"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            fontWeight='400'
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ padding: '0', justifyContent: 'center', marginBottom: '6px' }}
        >
          <FriendRequestBtn
            page={page}
            receiverId={user.id}
            friendsList={friendsList}
            followedList={followedList}
            getFriendsRequests={getFriendsRequests}
            getFriends={getFriends}
            getFollowed={getFollowed}
          />
        </CardActions>
        <Box
          width="23px"
          height="23px"
          position="absolute"
          top="3px"
          right="3px"
          borderRadius="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: 'rgba(244, 244, 244, 0.65)' }}
        >
          <img
            src="/images/gold_right_top_outlined.svg"
            alt=""
            style={{
              position: 'relative',
              top: '0.2px',
            }}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            position="absolute"
            color="#052525"
          >
            {`${user.count_common_gold_nuggets}`}
          </Typography>
        </Box>
      </Card>
      {!isLast ? (
        <Divider variant="middle" flexItem orientation="vertical" />
      ) : null}
    </>
  );
};

SuggestionsCard.propTypes = {
  page: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  friendsList: PropTypes.array,
  followedList: PropTypes.array,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default SuggestionsCard;
