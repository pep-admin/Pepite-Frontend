// Import des libs externes
import { Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Import du composant Paper customisé
import { Item } from '@utils/components/styledComponent';

const AccountSecuritySettings2 = ({ setShowPasswordModal }) => {
  return (
    <Item>
      <Stack spacing={2} padding="10px">
        <Typography
          align="left"
          fontSize="1em"
          component="p"
          fontWeight="500"
          color="#0E6666"
        >
          {'Modification du mot de passe'}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: '35px',
            background:
              'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)',
            color: '#fff',
            lineHeight: 'normal',
            padding: '2px 0 0 0',
          }}
          onClick={() => setShowPasswordModal(true)}
        >
          {'Modifier'}
        </Button>
      </Stack>
    </Item>
  );
};

AccountSecuritySettings2.propTypes = {
  setShowPasswordModal: PropTypes.func.isRequired,
};

export default AccountSecuritySettings2;
