// Import des libs externes
import {
  Stack,
  Typography,
  FormControlLabel,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

const AccountDisplaySettings = () => {
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
          {'Notifications : '}
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
              {'Activées'}
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
          {'Thème : '}
        </Typography>
        <ToggleButtonGroup
          // value={darkMode ? 'dark' : 'light'}
          exclusive
          // onChange={handleThemeChange}
          aria-label="Theme selection"
          sx={{
            height: '25px',
            columnGap: '10px',
          }}
        >
          <ToggleButton
            value="light"
            aria-label="Light theme"
            sx={{
              bgcolor: '#5AC164',
              borderRadius: '5px !important',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {'Clair'}
          </ToggleButton>
          <ToggleButton
            value="dark"
            aria-label="Dark theme"
            sx={{
              bgcolor: 'gray',
              borderRadius: '5px !important',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {'Sombre'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack
        direction="row"
        height="30px"
        padding="0 13px"
        alignItems="center"
        columnGap="10px"
      >
        <Typography fontSize="1em" component="p" color="#094B4B">
          {'Langue : '}
          <Typography fontSize="1em" component="span">
            {'Français'}
          </Typography>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        height="30px"
        padding="0 13px"
        alignItems="center"
        columnGap="10px"
      >
        <Typography fontSize="1em" component="p" color="#094B4B">
          {'Animations : '}
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
              {'Activées'}
            </span>
          }
        />
      </Stack>
    </Stack>
  );
};

export default AccountDisplaySettings;
