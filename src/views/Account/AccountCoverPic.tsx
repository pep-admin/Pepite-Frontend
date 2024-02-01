// Import des libs externes
import {
  Stack,
  Divider,
  Card,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

const AccountCoverPic = ({ setShowPicModal, loggedUserInfos }) => {
  return (
    <Stack direction="column">
      <Card
        sx={{
          height: '140px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '12px 0',
          boxShadow: 'none',
        }}
      >
        <CardMedia
          image={
            !loggedUserInfos.coverPics.length
              ? 'http://127.0.0.1:5173/images/default_cover_pic_pietro_jeng.jpg'
              : `${apiBaseUrl}/uploads/${
                  loggedUserInfos.coverPics.find(pic => pic.isActive === 1)
                    .filePath
                }`
          }
          sx={{
            height: '100%',
            width: '75%',
            borderRadius: '5px',
          }}
        />
      </Card>
      <Divider variant="middle" flexItem />
      <Stack direction="column" marginTop="9px">
        <Typography
          variant="body2"
          align="left"
          padding="0 5%"
          sx={{
            color: '#8E8E8E',
          }}
        >
          {
            'Vous pouvez modifier la photo de couverture depuis votre profil pour une meilleure visualisation.'
          }
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          margin="7px 0 12px 0"
        >
          <Button
            variant="contained"
            sx={{
              height: '25px',
              width: '40%',
              padding: '0',
              fontSize: '0.8em',
              textTransform: 'initial',
            }}
            onClick={() => setShowPicModal({ state: true, type: 'couverture' })}
          >
            {'Modifier'}
          </Button>
          <Button
            variant="contained"
            sx={{
              height: '25px',
              width: '40%',
              padding: '0',
              fontSize: '0.8em',
              textTransform: 'initial',
            }}
          >
            {'Aller sur votre profil'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

AccountCoverPic.propTypes = {
  setShowPicModal: PropTypes.func.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
};

export default AccountCoverPic;
