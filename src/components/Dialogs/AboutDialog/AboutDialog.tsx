import { useState } from 'react';
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Stack,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { FrontEndEnvInfo } from './FrontEndEnvInfo';
import { BackendEnvInfo } from './BackendInfo';

export function AboutDialog() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        color="info"
        aria-label="à propos"
        size="large"
      >
        <InfoIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: '#0E6666',
            color: theme.palette.text.secondary,
          },
        }}
      >
        <DialogTitle variant="h4">À propos</DialogTitle>
        <DialogContent>
          <Stack>
            <FrontEndEnvInfo />
            <BackendEnvInfo />
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
