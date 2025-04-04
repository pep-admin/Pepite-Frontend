import { useAlert } from '@hooks/AlertContext';
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const ConfirmationAlert = () => {
  const { alert, hideAlert } = useAlert();

  const handleConfirm = () => {
    if (alert.onConfirm) alert.onConfirm();
    hideAlert();
  };

  const handleCancel = () => {
    if (alert.onCancel) alert.onCancel();
    hideAlert();
  };

  return (
    <Dialog
      open={alert.open}
      onClose={hideAlert}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Alert
        severity={alert.severity}
        sx={{ width: '100%', backgroundColor: '#191919' }}
      >
        {alert.title && (
          <AlertTitle
            color={
              alert.severity === 'info'
                ? 'info.main'
                : alert.severity === 'warning'
                ? '#d86304'
                : '#c02c2c'
            }
            sx={{
              margin:
                alert.onConfirm || alert.onCancel ? '0 0 24px 0' : '0 0 14px 0',
            }}
          >
            {alert.title}
          </AlertTitle>
        )}
        <DialogContent
          sx={{
            padding: 0,
            marginBottom: alert.onConfirm || alert.onCancel ? '0' : '5px',
          }}
        >
          <DialogContentText color="text.primary" lineHeight="1.8">
            {alert.message}
          </DialogContentText>
        </DialogContent>

        {/* Boutons affichés uniquement si onConfirm et onCancel existent */}
        {(alert.onConfirm || alert.onCancel) && (
          <DialogActions sx={{ padding: 0, marginTop: '15px' }}>
            <Button
              onClick={handleCancel}
              sx={{
                color: '#757575',
              }}
            >
              {'Annuler'}
            </Button>
            <Button onClick={handleConfirm} color="secondary" autoFocus>
              {'Confirmer'}
            </Button>
          </DialogActions>
        )}
      </Alert>
    </Dialog>
  );
};

export default ConfirmationAlert;
