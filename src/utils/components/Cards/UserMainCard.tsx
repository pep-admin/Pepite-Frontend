import { Stack, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';

const UserMainCard = ({ userInfos, direction, avatarSize, setSearchResults, setFriendSelected }) => {

  const selectFriend = (friend) => {
    console.log('selected');
    
    setSearchResults([]);
    setFriendSelected(friend);
  };

  return (
    <Stack direction={direction} >
      <Stack alignItems='center'>
        <UserAvatar
          userInfos={userInfos} 
          picHeight={avatarSize} 
          picWidth={avatarSize}
          sx={null}
          redirection={false} 
          onSelect={selectFriend}
        /> 
      </Stack>
      <Stack marginTop='8px' >
        <Typography 
          align='center' 
          fontSize='0.9em' 
          fontWeight='300'
          color='#eeeeee'
          maxWidth={`${avatarSize}`}
          sx={{
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          }}  
        >
          <span style={{ display: 'block' }}>{userInfos.first_name}</span>
          <span style={{ display: 'block' }}>{userInfos.last_name}</span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserMainCard;