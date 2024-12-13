// Import des libs externes
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({
  alertType,
  message,
  setShowAlert,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      // Supprime la modale après l'animation du collapse
      const timer = setTimeout(() => {
        if (setShowAlert) {
          console.log('reset');
          
          setShowAlert({ display: false, error: false, severity: '', message: '' });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleAlert = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 10vw)',
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
            bgcolor: 
              alertType === 'error' 
              ? '#390c0c' 
              : alertType === 'success' 
              ? '#063506'
              : '#0f3434',
            color: '#fff',
          }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
