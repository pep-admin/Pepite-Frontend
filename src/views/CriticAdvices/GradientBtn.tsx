// Import des libs externes
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import MovieIcon from '@mui/icons-material/Movie';

const GradientBtn = ({ btnType, criticsNumber, goldNuggetsNumber }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const generateContent = () => {
    if (btnType === 'movies-list') {
      return <MovieIcon />;
    } else if (btnType === 'ratings') {
      return (
        <Stack>
          <Typography variant="body1" fontWeight="600" lineHeight="normal">
            {`${criticsNumber}`}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="300"
            letterSpacing="-0.5px"
            textTransform="lowercase"
          >
            {`note${criticsNumber > 1 ? 's' : ''}`}
          </Typography>
        </Stack>
      );
    } else if (btnType === 'gold-nuggets') {
      return (
        <Stack>
          <Typography variant="body1" fontWeight="600" lineHeight="normal">
            {`${goldNuggetsNumber}`}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="300"
            letterSpacing="-0.7px"
            textTransform="lowercase"
          >
            {`pépite${goldNuggetsNumber > 1 ? 's' : ''}`}
          </Typography>
        </Stack>
      );
    }
  };

  return (
    <Button
      sx={{
        height: btnType === 'movies-list' ? '38px' : '50px',
        width: btnType === 'movies-list' ? '38px' : '50px',
        minWidth: 'auto',
        padding: '0',
        background:
          'linear-gradient(315deg, rgba(14,102,102,1) 45%, rgba(107,218,218,1) 100%)',
        borderRadius: '50%',
        outline: '3px solid #FDFDFD',
        marginBottom: btnType === 'movies-list' ? '25px' : '15px',
        boxShadow:
          btnType === 'movies-list'
            ? 'none'
            : '0px 8px 5px 0px rgb(57 57 57 / 10%)',
      }}
      onClick={() => btnType === 'movies-list' && navigate(`/list/${id}`)}
    >
      {generateContent()}
    </Button>
  );
};

GradientBtn.propTypes = {
  btnType: PropTypes.string.isRequired,
  criticsNumber: PropTypes.number,
  goldNuggetsNumber: PropTypes.number,
};

export default GradientBtn;
