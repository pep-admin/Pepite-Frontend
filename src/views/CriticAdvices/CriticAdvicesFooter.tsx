// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';

// Import des icônes
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';

const CriticAdvicesFooter = () => {
  return (
    <>
      <Divider />
      <Stack
        direction="row"
        spacing={5}
        height="30px"
        padding="0 17px"
        flexGrow="1"
      >
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <ChatTwoToneIcon
            fontSize="small"
            sx={{ position: 'relative', top: '1px' }}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {5}
          </Typography>
        </Box>
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <ThumbUpTwoToneIcon
            fontSize="small"
            sx={{ position: 'relative', bottom: '1px' }}
          />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {3}
          </Typography>
        </Box>
        <Box height="100%" display="flex" alignItems="center" columnGap="5px">
          <AddToPhotosTwoToneIcon fontSize="small" />
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {'À voir'}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default CriticAdvicesFooter;
