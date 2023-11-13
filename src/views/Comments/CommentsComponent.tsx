// Import des libs externes
import { Stack, Typography, Divider } from '@mui/material';
import { Item } from '@utils/styledComponent';
import CommentsInput from './CommentsInput';

const CommentsComponent = () => {
  return (
    <Item margintop="6px">
      <Stack direction="row" height="25px" alignItems="center" padding="0 10px">
        <Typography
          variant="body2"
          component="p"
          fontWeight="bold"
          lineHeight="10px"
        >
          {'Commentaires'}
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <CommentsInput />
      </Stack>
    </Item>
  );
};

export default CommentsComponent;
