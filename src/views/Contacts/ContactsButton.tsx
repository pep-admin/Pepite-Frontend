import { Button } from '@mui/material';

const ContactsButton = ({ btnType, btn, handleBtnAction }) => {

  const IconComponent = btn.icon;

  return (
    <Button
      sx={{
        height: '33px',
        width: '33px',
        minWidth: 'auto',
        padding: '5px',
        backgroundColor: '#011212 !important',
        border: '1px solid #2E2E2E',
        borderRadius: '4px',
        color: btn.color // Utilisation de la couleur spécifiée dans votre tableau
      }}  
      onClick={() => handleBtnAction(btn.action)}
    >
      <IconComponent />
    </Button>
  );
};

export default ContactsButton;
