import { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar2 = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        onSearch(searchQuery);
      }
    }, 300); // Délai de 300 ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Prénom et nom"
        value={searchQuery}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled>
                <SearchIcon sx={{ color: '#3a3a3a' }}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: '#011212',
          borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2E2E2E',
            },
            '&:hover fieldset': {
              borderColor: '#3a3a3a !important',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3a3a3a !important',
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar2;
