import { Divider, Stack, Typography, useTheme } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const RatingFriendSelected = ({ friendSelected, setFriendSelected, movieSelected }) => {

  const theme = useTheme();

  const isMovieOrSerie = findIfMovieOrSerie(movieSelected);
  const movieTitle = isMovieOrSerie === 'movie' ? movieSelected.title : movieSelected.name;
  const friendFullname = `${friendSelected.first_name} ${friendSelected.last_name}`;

  return (
    <>
      <Stack direction='row' alignItems='center' marginTop='30px' >
        <UserAvatar
          userInfos={friendSelected}
          picHeight={'80px'}
          picWidth={'80px'}
          sx={null}
          redirection={null}
          onSelect={() => setFriendSelected(null)}
        />
        <Typography
          height='fit-content'
          padding='0 20px'
          color={theme.palette.text.secondary}
          fontWeight='300'
        >
          {'Vous conseillez '}
          <span style={{ fontWeight: '500' }}>
            {movieTitle}
          </span> {'à '} 
          <span style={{ fontWeight: '500' }}>
            {friendFullname}
          </span>.
        </Typography>
      </Stack>
      <Divider sx={{ borderColor: '#282828', marginTop: '30px' }} />
    </>
    
  );
};

export default RatingFriendSelected;