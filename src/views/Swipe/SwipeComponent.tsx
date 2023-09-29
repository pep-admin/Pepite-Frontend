// Import des libs externes
import { styled, Paper, Container, Stack, Box } from '@mui/material';

// Import des composants internes
import Header from "@utils/Header";
import SearchBar from '@utils/SearchBar';
import SwipeFilter from '@views/Swipe/SwipeFilter';
import SwipeMain from '@views/Swipe/SwipeMain';

// 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  borderRadius: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const SwipeComponent = () => {

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ backgroundColor: '#F4F4F4' }}>
        <Stack spacing={ 1 } sx={{ padding: '8px 0'}}>
          <SearchBar Item={ Item } />
          <Box>
            <SwipeFilter Item={ Item } />
          </Box>
          <Box>
            <SwipeMain Item={ Item } />
          </Box>
          <Box>
            <Item>
            </Item>
          </Box>
          
        </Stack>
      </Container>
    </>
   
  );
};

export default SwipeComponent;