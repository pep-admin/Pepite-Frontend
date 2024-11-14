import { Button, Stack } from '@mui/material';

const ProfilRequestButtons = () => {
  return (
    <Stack
      direction='row' 
      justifyContent='space-between'
      width='100%'
      // marginTop='26px !important'
    >
      <Button
        sx={{
          height: '35px',
          width: '45%',
          padding: '2px 10px 0 10px',
          color: '#f1f1f1',
          outline: '1px solid #2D2D2D',
          fontSize: '0.75em',
          fontWeight: '400'
        }}
      >
        {'Suivre'}
      </Button>
      <Button
        sx={{
          height: '35px',
          width: '45%',
          padding: '2px 10px 0 10px',
          color: '#f1f1f1',
          outline: '1px solid #2D2D2D',
          fontSize: '0.75em',
          fontWeight: '400'
        }}
      >
        {'Demander en ami'}
      </Button>
    </Stack>
  );
};

export default ProfilRequestButtons;