// Import des libs externes
import { Box, Collapse, Alert, IconButton, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({
  alertType,
  criticOrAdvice,
  message,
  setOnAlert,
  setShowModal,
  confirmation,
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
          severity={alertType}
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
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '0',
            borderRadius: '0',
            bgcolor: '#032c2c',
            color: '#fff'
          }}
        >
          {message}
          {alertType === 'warning' ? (
            <Stack direction="row" justifyContent="center">
              <Button
                onClick={() =>
                  confirmation(
                    true,
                    criticOrAdvice === 'new-critic' ? 'critic' : 'advice',
                  )
                }
                sx={{
                  color: '#D66506'
                }}
              >
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
  alertType: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  setOnAlert: PropTypes.func,
  setShowModal: PropTypes.func,
  confirmation: PropTypes.func,
  criticOrAdvice: PropTypes.string,
};

export default CustomAlert;
