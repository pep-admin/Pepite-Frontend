// AlertContext.js
import { createContext, useContext, useState } from 'react';
import { AlertColor } from '@mui/material';
import ConfirmationAlert from '@utils/components/Infos/ConfirmationAlert';

// Définissez le type pour les paramètres d'alerte, avec `AlertColor` pour la sévérité
type AlertParams = {
  message: string;
  title: string;
  severity: AlertColor; // Définit severity comme AlertColor
  onConfirm?: () => void;
  onCancel?: () => void;
};

// Création du contexte avec des valeurs par défaut
const AlertContext = createContext({
  alert: {
    open: false,
    message: '',
    title: '',
    severity: 'info' as AlertColor, // Utilisation de `as AlertColor` pour garantir la compatibilité
    onConfirm: null,
    onCancel: null,
  },
  showAlert: (_: AlertParams) => {},
  hideAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    title: '',
    severity: 'info' as AlertColor, // Assertion explicite pour la compatibilité
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = ({ message, title, severity, onConfirm, onCancel }: AlertParams) => {
    // Validation de la sévérité pour assurer qu'elle est de type AlertColor
    const validSeverity: AlertColor = ['success', 'error', 'warning', 'info'].includes(severity)
      ? severity
      : 'info';

    setAlert({
      open: true,
      message,
      title,
      severity: validSeverity,
      onConfirm,
      onCancel,
    });
  };

  const hideAlert = () => setAlert((prevAlert) => ({ ...prevAlert, open: false }));

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
      {alert.open && <ConfirmationAlert />}
    </AlertContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'alerte
export const useAlert = () => useContext(AlertContext);
