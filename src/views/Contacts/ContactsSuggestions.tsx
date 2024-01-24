// Import des libs externes
import {
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import apiBaseUrl from '@utils/request/config';
import FriendRequestBtn from '@utils/FriendRequestBtn';

const ContactsSuggestions = ({
  user,
  friendsList,
  followedList,
  getFriendsRequests,
  getFriends,
  getFollowed,
  isLast,
}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

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
                : `http://127.0.0.1:5173/images/default_profil_pic.png`
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
            gutterBottom
            component="h4"
            margin="0"
            paddingLeft="8px"
            maxWidth="100%"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            sx={{ fontSize: '1em' }}
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ padding: '0', justifyContent: 'center', marginBottom: '6px' }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{
              width: '72px',
              height: '20px',
              textTransform: 'initial',
              fontWeight: 'normal',
              fontSize: '0.9em',
              padding: '0',
            }}
            onClick={e => handleClick(e)}
          >
            {'Ajouter'}
          </Button>
          <FriendRequestBtn
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
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

ContactsSuggestions.propTypes = {
  user: PropTypes.object.isRequired,
  friendsList: PropTypes.array.isRequired,
  followedList: PropTypes.array.isRequired,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default ContactsSuggestions;
