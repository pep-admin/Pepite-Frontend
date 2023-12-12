// Import des libs externes
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ type, message, setOnSuccess }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setOnSuccess({ state: null, message: null });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open, setOnSuccess]);

  const handleAlert = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%', position: 'absolute', zIndex: '10' }}>
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
          sx={{ mb: 2, height: '81px', alignItems: 'center' }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

CustomAlert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setOnSuccess: PropTypes.func.isRequired,
};

export default CustomAlert;
