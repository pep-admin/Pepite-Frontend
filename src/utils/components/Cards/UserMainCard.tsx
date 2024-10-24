import { Stack, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';

const UserMainCard = ({ userInfos }) => {
  return (
    <Stack direction='row'>
      <Stack direction='row'>
        <Stack>
          <UserAvatar
            userInfos={userInfos} 
            picHeight={'60px'} 
            picWidth={'60px'}
            sx={null}
            redirection={false} 
          /> 
        </Stack>
        <Stack>
          <Typography>
            {`${userInfos.first_name} ${userInfos.last_name}`}
          </Typography>

        </Stack>
      </Stack>
      
    </Stack>
  );
};

export default UserMainCard;