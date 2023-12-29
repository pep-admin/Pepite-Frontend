// Import des libs externes
import { Box, Collapse, Alert, IconButton, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({
  type,
  message,
  setOnSuccess,
  setShowModal,
  confirmation,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      // Supprime la modale après l'animation du collapse
      const timer = setTimeout(() => {
        if (setOnSuccess) {
          setOnSuccess({ state: null, message: null });
        }
        if (setShowModal) {
          setShowModal(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open, setOnSuccess]);

  const handleAlert = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 12px)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
      }}
    >
      <Collapse in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, alignItems: 'center', marginBottom: '0' }}
        >
          {message}
          {type === 'warning' ? (
            <Stack direction="row" justifyContent="center">
              <Button onClick={() => confirmation()}>{'Confirmer'}</Button>
              <Button onClick={() => setShowModal(false)}>{'Annuler'}</Button>
            </Stack>
          ) : null}
        </Alert>
      </Collapse>
    </Box>
  );
};

CustomAlert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setOnSuccess: PropTypes.func,
  setShowModal: PropTypes.func,
  confirmation: PropTypes.func,
};

export default CustomAlert;
