// Import des libs externes
import {
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';

const SearchResults = ({ result, handleChoice, setDisplayResults }) => {
  return (
    <Box>
      <ListItem
        onClick={() => {
          handleChoice(result.id);
          setDisplayResults(null);
        }}
        sx={{ display: 'flex' }}
      >
        <ListItemAvatar>
          <Avatar
            alt={result.title || result.name}
            src={
              result.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                : 'http://127.0.0.1:5173/images/no_poster.jpg'
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
              {result.title || result.name}
            </Typography>
          }
          secondary={
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
          }
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        />
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
