// Import des libs externes
import { Box, TextField } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
import PropTypes from 'prop-types';

// Création d'une loupe en SVG
const MagnifyingGlassIcon = createSvgIcon(
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.02725 12.7873C9.12961 12.9124 9.49529 13.102 9.731 12.8766L9.80306 12.8078C10.0388 12.5824 10.0028 12.256 9.72305 12.0825C9.72305 12.0825 9.11641 11.7062 8.6287 11.2398C8.14624 10.7785 7.74648 10.195 7.74648 10.195C7.56384 9.92835 7.22146 9.8946 6.98576 10.12L6.91686 10.1859C6.68116 10.4113 6.87491 10.7599 7.00744 10.8581C7.13998 10.9563 7.44121 11.2212 7.67698 11.4466L8.41252 12.15C8.64837 12.3754 8.92495 12.6622 9.02725 12.7873Z"
      fill="#0E6666"
    />
    <path
      d="M18.1855 10.4783C19.395 9.3218 19.9999 7.80561 19.9999 6.2898C19.9999 4.77367 19.3952 3.258 18.1855 2.10121C15.7664 -0.212041 11.8442 -0.212041 9.42518 2.10121C8.2156 3.25787 7.61084 4.7738 7.61084 6.2898C7.61084 7.80574 8.2156 9.32167 9.42518 10.4783C11.8443 12.7916 15.7664 12.7916 18.1855 10.4783ZM11.0365 8.93065C10.2718 8.20147 9.88965 7.24541 9.88965 6.28974C9.88965 5.33381 10.2718 4.37814 11.0365 3.64883C12.5658 2.19034 15.0449 2.19027 16.5744 3.64883C17.3389 4.37801 17.721 5.33387 17.721 6.28967C17.721 7.24554 17.3388 8.20134 16.5744 8.93065C15.0451 10.3892 12.5657 10.3892 11.0365 8.93065Z"
      fill="#0E6666"
    />
    <path
      d="M3.0009 19.2616L8.09796 14.3875C8.25278 14.2394 8.33811 14.041 8.33811 13.8291C8.33811 13.6171 8.25272 13.4188 8.09796 13.2706L6.50512 11.7476C6.35029 11.5994 6.14287 11.5179 5.9211 11.5179C5.69947 11.5179 5.49205 11.5995 5.33722 11.7476L0.24003 16.6216C0.0852038 16.7697 -0.00012207 16.9681 -0.00012207 17.18V17.1801C-0.00012207 17.392 0.0852712 17.5903 0.24003 17.7385L1.83287 19.2616C2.15491 19.5695 2.67892 19.5695 3.0009 19.2616Z"
      fill="#0E6666"
    />
  </svg>,
  'MagnifyingGlassIcon',
);

const SearchBar = ({ Item }) => {
  return (
    <Box component="form">
      <Item
        sx={{
          height: '40px',
          padding: '0 10%',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <TextField
          id="filled-basic"
          label="Rechercher un film, une série, une personne"
          variant="filled"
          size="small"
          fullWidth
        />
        <MagnifyingGlassIcon />
      </Item>
    </Box>
  );
};

SearchBar.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

export default SearchBar;
