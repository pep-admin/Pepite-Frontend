import { Divider, Stack, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const CriticAdvicesReview2 = ({ infos }) => {
  return (
    <Stack 
      bgcolor='#f2f2f2' 
      flexGrow='1' 
      padding='5px 10px'
      sx={{
        borderRadius: '5px'
      }}
    >
      <Stack direction='row' columnGap='5px' marginBottom='5px'>
        <FormatQuoteIcon fontSize='small' sx={{ color: '#0E6666'}}/>
        <Typography variant='body1' fontWeight='600' color='#0E6666'>
          {'Votre critique'}
        </Typography>
      </Stack>
      <Divider />
      <Stack padding='5px 10px'>
        <Typography 
          variant='body2' 
          align='left'
          fontWeight='400'
          >
          {`${infos.text}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CriticAdvicesReview2;