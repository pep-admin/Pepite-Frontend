// Import des libs externes
import { Box, Collapse, Alert, IconButton, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({
  type,
  message,
  setOnAlert,
  setShowModal,
  confirmation,
  usage,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      // Supprime la modale après l'animation du collapse
      const timer = setTimeout(() => {
        if (setOnAlert) {
          setOnAlert({ state: null, message: null });
        }
        if (setShowModal) {
          setShowModal(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open, setOnAlert]);

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
        zIndex: '100',
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
          sx={{
            mb: 2,
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '0',
            borderRadius: '0',
          }}
        >
          {message}
          {type === 'warning' ? (
            <Stack direction="row" justifyContent="center">
              <Button onClick={() => confirmation(`${usage}`)}>
                {'Confirmer'}
              </Button>
              <Button onClick={() => handleAlert()}>{'Annuler'}</Button>
            </Stack>
          ) : null}
        </Alert>
      </Collapse>
    </Box>
  );
};

CustomAlert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  setOnAlert: PropTypes.func,
  setShowModal: PropTypes.func,
  confirmation: PropTypes.func,
  usage: PropTypes.string,
};

export default CustomAlert;
