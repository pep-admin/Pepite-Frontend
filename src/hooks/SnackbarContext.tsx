import { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';

// Ajoutez une fonction vide comme valeur par défaut pour le contexte
const SnackbarContext = createContext((_: string) => {});

export const SnackbarProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleOpenSnackbar = useCallback((message: string) => {
    setSnackbarMessage(message);
  }, []);

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarMessage(null);
  };

  return (
    <SnackbarContext.Provider value={handleOpenSnackbar}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(snackbarMessage)}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </SnackbarContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
