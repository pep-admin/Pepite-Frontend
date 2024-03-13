import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';

const ColoredRating = ({
  color,
  emptyColor,
  value,
  readOnly,
  precision,
  sx,
}) => {
  const StyledRating = styled(Rating)({
    '.MuiRating-iconFilled': {
      color: color,
    },
    '.MuiRating-iconEmpty': {
      color: emptyColor,
    },
  });

  return (
    <StyledRating
      readOnly={readOnly}
      value={value}
      precision={precision}
      emptyIcon={<StarIcon color={emptyColor} fontSize="inherit" />}
      sx={{
        alignItems: 'center',
        fontSize: '0.9em',
        position: 'relative',
        left: '-4px',
        bottom: '1.1px',
        ...sx,
      }}
    />
  );
};

ColoredRating.propTypes = {
  color: PropTypes.string.isRequired,
  emptyColor: PropTypes.string.isRequired,
  value: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  precision: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default ColoredRating;
