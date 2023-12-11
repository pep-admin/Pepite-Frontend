// Import des libs externes
import {
  Stack,
  Typography,
  FormControlLabel,
  Switch,
  Input,
} from '@mui/material';

// Import des icônes
import EditIcon from '@mui/icons-material/Edit';

const AccountSecuritySettings = () => {
  return (
    <Stack direction="column" spacing={1} padding="6px 0">
      <Stack
        direction="row"
        height="30px"
        padding="0 13px"
        alignItems="center"
        columnGap="10px"
      >
        <Typography fontSize="1em" component="p" color="#094B4B">
          {'Mot de passe : '}
        </Typography>
        <Input disabled defaultValue="********" sx={{ bgcolor: '#ececec' }} />
        <EditIcon sx={{ fontSize: '20px', color: '#b5b5b5' }} />
      </Stack>
      <Stack
        direction="row"
        height="30px"
        padding="0 13px"
        alignItems="center"
        columnGap="10px"
      >
        <Typography fontSize="1em" component="p" color="#094B4B">
          {"Autoriser les demandes d'amitié : "}
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={
            <span
              style={{
                fontSize: '0.9em',
                fontWeight: 'bold',
                color: '#5AC164',
              }}
            >
              {'Activé'}
            </span>
          }
        />
      </Stack>
      <Stack
        direction="row"
        height="30px"
        padding="0 13px"
        alignItems="center"
        columnGap="10px"
      >
        <Typography fontSize="1em" component="p" color="#094B4B">
          {'Autoriser les suivis : '}
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={
            <span
              style={{
                fontSize: '0.9em',
                fontWeight: 'bold',
                color: '#5AC164',
              }}
            >
              {'Activé'}
            </span>
          }
        />
      </Stack>
    </Stack>
  );
};

export default AccountSecuritySettings;
