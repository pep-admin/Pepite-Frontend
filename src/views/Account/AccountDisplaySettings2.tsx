import { useData } from '@hooks/DataContext';
import {
  FormControlLabel,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Item } from '@utils/components/styledComponent';

const AccountDisplaySettings2 = () => {
  const { displayType, setDisplayType } = useData();

  return (
    <Item>
      <Stack spacing={2} padding="10px">
        <Stack>
          <Typography
            align="left"
            fontSize="1em"
            component="p"
            fontWeight="500"
            color="#0E6666"
          >
            {'Type de contenu'}
          </Typography>
          <ToggleButtonGroup
            // value={darkMode ? 'dark' : 'light'}
            exclusive
            // onChange={handleThemeChange}
            aria-label="Selection de type de contenu"
            sx={{
              height: '25px',
              columnGap: '10px',
              marginTop: '5px',
            }}
          >
            <ToggleButton
              value="all"
              aria-label="Choix de contenu : tous"
              sx={{
                bgcolor: displayType === 'all' ? '#5AC164' : 'gray',
                borderRadius: '5px !important',
                color: '#fff',
                fontWeight: '500',
                padding: '3px 0 0 0',
                width: '100px',
                '&:hover': {
                  bgcolor: displayType === 'all' ? '#5AC164' : 'gray',
                },
              }}
              onClick={() => setDisplayType('all')}
            >
              {'Tous'}
            </ToggleButton>
            <ToggleButton
              value="movie"
              aria-label="Choix de contenu : films"
              sx={{
                bgcolor: displayType === 'movie' ? '#5AC164' : 'gray',
                borderRadius: '5px !important',
                color: '#fff',
                fontWeight: '500',
                padding: '3px 0 0 0',
                width: '100px',
                '&:hover': {
                  bgcolor: displayType === 'movie' ? '#5AC164' : 'gray',
                },
              }}
              onClick={() => setDisplayType('movie')}
            >
              {'Films'}
            </ToggleButton>
            <ToggleButton
              value="tv"
              aria-label="Choix de contenu : séries"
              sx={{
                bgcolor: displayType === 'tv' ? '#5AC164' : 'gray',
                borderRadius: '5px !important',
                color: '#fff',
                fontWeight: '500',
                padding: '3px 0 0 0',
                width: '100px',
                '&:hover': {
                  bgcolor: displayType === 'tv' ? '#5AC164' : 'gray',
                },
              }}
              onClick={() => setDisplayType('tv')}
            >
              {'Séries'}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack>
          <Typography
            align="left"
            fontSize="1em"
            component="p"
            fontWeight="500"
            color="#0E6666"
          >
            {'Thème'}
          </Typography>
          <ToggleButtonGroup
            // value={darkMode ? 'dark' : 'light'}
            exclusive
            // onChange={handleThemeChange}
            aria-label="Theme selection"
            sx={{
              height: '25px',
              columnGap: '10px',
              marginTop: '5px',
            }}
          >
            <ToggleButton
              value="light"
              aria-label="Light theme"
              sx={{
                bgcolor: '#5AC164',
                borderRadius: '5px !important',
                color: '#fff',
                fontWeight: '500',
                padding: '3px 0 0 0',
                width: '100px',
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
                fontWeight: '500',
                padding: '3px 0 0 0',
                width: '100px',
              }}
            >
              {'Sombre'}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack>
          <Typography
            align="left"
            fontSize="1em"
            component="p"
            fontWeight="500"
            color="#0E6666"
          >
            {'Notifications'}
          </Typography>
          <FormControlLabel
            control={<Switch color="success" defaultChecked />}
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
    </Item>
  );
};

export default AccountDisplaySettings2;
