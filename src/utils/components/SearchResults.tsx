// Import des libs externes
import {
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des variables d'environnement
import apiBaseUrl from '../request/config';

// Import des icônes
import PersonIcon from '@mui/icons-material/Person';

const SearchResults = ({ result, handleChoice, setDisplayResults }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <ListItem
        onClick={() => {
          if (result.type !== 'user') {
            handleChoice(result.id);
            setDisplayResults(null);
          } else {
            navigate(`/profil/${result.id}`);
          }
        }}
        sx={{ display: 'flex' }}
      >
        <ListItemAvatar>
          <Avatar
            alt={
              result.type !== 'user'
                ? result.title || result.name
                : `${result.first_name} ${result.last_name}`
            }
            src={
              // Si le film / série a un poster
              result.type !== 'user' && result.poster_path
                ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                : // Si le film / série n'a pas de poster
                result.type !== 'user' && !result.poster_path
                ? 'http://127.0.0.1:5173/images/no_poster.jpg'
                : // Si l'utilisateur n'a pas de photo de profil
                result.type === 'user' && !result.file_path
                ? 'http://127.0.0.1:5173/images/default_profil_pic.png'
                : // Si l'utilisateur a une photo de profil
                  `${apiBaseUrl}/Uploads/${result.file_path}`
            }
            sx={{ borderRadius: 0 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              sx={{ display: 'inline' }}
              component="h4"
              variant="body2"
              color="text.primary"
            >
              {result.type !== 'user'
                ? result.title || result.name
                : `${result.first_name} ${result.last_name}`}
            </Typography>
          }
          secondary={
            result.type !== 'user' ? (
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {result.release_date
                  ? result.release_date.split('-')[0]
                  : result.first_air_date
                  ? result.first_air_date.split('-')[0]
                  : null}
              </Typography>
            ) : null
          }
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        />
        {result.type === 'user' ? (
          <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
            <PersonIcon />
          </ListItemIcon>
        ) : null}
      </ListItem>
      <Divider variant="inset" component="li" sx={{ listStyleType: 'none' }} />
    </Box>
  );
};

SearchResults.propTypes = {
  result: PropTypes.object.isRequired,
  handleChoice: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  setDisplayResults: PropTypes.func.isRequired,
};

export default SearchResults;
