// Import des libs externes
import { Stack, Typography } from '@mui/material';

const AccountDelete = () => {
  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="flex-start"
      padding="6px 13px"
    >
      <Typography
        height="30px"
        fontSize="1em"
        component="p"
        fontWeight="bold"
        color="red"
        display="flex"
        alignItems="center"
      >
        {'Réinitialiser le compte'}
      </Typography>
      <Typography
        height="30px"
        fontSize="1em"
        component="p"
        fontWeight="bold"
        color="red"
        display="flex"
        alignItems="center"
      >
        {'Supprimer le compte'}
      </Typography>
    </Stack>
  );
};

export default AccountDelete;
