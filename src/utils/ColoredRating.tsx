import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

const ColoredRating = ({ color, value, readOnly, precision }) => {
  const StyledRating = styled(Rating)({
    '.MuiRating-iconFilled': {
      color: color,
    },
  });

  return (
    <StyledRating
      readOnly={readOnly}
      value={value}
      precision={precision}
      sx={{
        fontSize: '0.9em',
        position: 'relative',
        left: '-4px',
        bottom: '1.1px',
        // ...sx, // Permet d'ajouter des styles supplémentaires si nécessaire
      }}
    />
  );
};

ColoredRating.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  readOnly: PropTypes.bool.isRequired,
  precision: PropTypes.number.isRequired,
};

export default ColoredRating;
