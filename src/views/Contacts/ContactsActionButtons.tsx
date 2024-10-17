import { Button } from '@mui/material';

const ContactsActionButtons = ({ btn, handleBtnAction, btnStatus }) => {

  const IconComponentDisabled = btn.iconFalse;
  const IconComponentEnabled = btn.iconTrue;

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
      }}  
      onClick={() => handleBtnAction(btn.action)}
    >
      {
        !btnStatus ?
          <IconComponentDisabled sx={{color: btn.colorDisabled}} />
        :
          <IconComponentEnabled sx={{color: btn.colorEnabled}} />
      }
    </Button>
  );
};

export default ContactsActionButtons;