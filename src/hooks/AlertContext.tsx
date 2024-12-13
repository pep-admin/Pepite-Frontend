// AlertContext.js
import { createContext, useContext, useState } from 'react';
import { AlertColor } from '@mui/material';
import ConfirmationAlert from '@utils/components/Infos/ConfirmationAlert';

type AlertParams = {
  title: string;
  message: string;
  severity: AlertColor;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const AlertContext = createContext({
  alert: {
    open: false,
    title: '',
    message: '',
    severity: 'info' as AlertColor,
    onConfirm: null,
    onCancel: null,
  },
  showAlert: (_: AlertParams) => {},
  showSimpleAlert: (_: string, __: string, ___: AlertColor) => {}, // Initialisation correcte de showSimpleAlert
  hideAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    severity: 'info' as AlertColor,
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = ({ title, message, severity, onConfirm, onCancel }: AlertParams) => {
    setAlert({
      open: true,
      title,
      message,
      severity,
      onConfirm,
      onCancel,
    });
  };

  // Fonction pour afficher une alerte simple sans onConfirm ni onCancel
  const showSimpleAlert = (title: string, message: string, severity: AlertColor) => {
    setAlert({
      open: true,
      title,
      message,
      severity,
      onConfirm: null,
      onCancel: null,
    });
  };

  const hideAlert = () => setAlert((prevAlert) => ({ ...prevAlert, open: false }));

  return (
    <AlertContext.Provider value={{ alert, showAlert, showSimpleAlert, hideAlert }}>
      {children}
      {alert.open && <ConfirmationAlert />}
    </AlertContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'alerte
export const useAlert = () => useContext(AlertContext);
