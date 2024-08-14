// Import des libs externes
import { Box, Collapse, Alert, IconButton, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert2 = ({ alertType, contentType, message, content, confirmation, setAlertSeverity}) => {

  const [open, setOpen] = useState(true);

  // Fermeture de l'alerte
  const closeAlert = () => {
    setOpen(false);
    setAlertSeverity({
      state: null,
      contentType: null,
      message: null,
      content: null,
      confirmation: null
    });
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
                closeAlert();
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
            color: '#fff',
          }}
        >
          {message}
          {alertType === 'warning' ? (
            <Stack direction="row" justifyContent="center">
              <Button
                onClick={() => confirmation(true, contentType, content)}
                sx={{
                  color: '#D66506',
                }}
              >
                {'Confirmer'}
              </Button>
              <Button onClick={() => closeAlert()}>{'Annuler'}</Button>
            </Stack>
          ) : null}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert2;