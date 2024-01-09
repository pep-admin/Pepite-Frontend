// Import des libs externes
import { Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const RelationAverageRatings = ({ open, anchorEl, setAnchorEl }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
    </Menu>
  );
};

RelationAverageRatings.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
};

export default RelationAverageRatings;
