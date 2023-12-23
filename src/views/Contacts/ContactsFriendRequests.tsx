//  Import des libs externes
import { Stack, Avatar, Typography, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

// Import des icônes
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ContactsFriendRequests = ({ user }) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={`Photo de profil de ${user.first_name} ${user.last_name}`}
            src={
              // Si l'utilisateur a défini une photo de profil
              user.file_path
                ? `${apiBaseUrl}/uploads/${user.file_path}`
                : // Si l'utilisateur n'a pas défini de photo de profil
                  'http://127.0.0.1:5173/images/default_profil_pic.png'
            }
            sx={{
              width: 50,
              height: 50,
            }}
          />
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="body2" component="h4" fontWeight="bold">
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="body2" component="h4" color="primary">
              {`3 amis en commun`}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '25px',
              width: '57px',
              minWidth: 'auto',
              color: '#fff',
              padding: '0',
              fontSize: '0.9em',
              fontWeight: 'normal',
              textTransform: 'initial',
            }}
          >
            {'Accepter'}
          </Button>
          <DeleteOutlineOutlinedIcon
            fontSize="small"
            sx={{ color: '#8E8E8E' }}
          />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};

ContactsFriendRequests.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ContactsFriendRequests;
