import { Divider, Stack, Typography } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { contactsActionButtons } from '@utils/data/contactsActionButtons';
import ContactsActionButtons from './ContactsActionButtons';
import { useSnackbar } from '@hooks/SnackbarContext';
import { useRef, useState } from 'react';

const ContactsSearchCard = ({ user, isLastCard }) => {

  const handleOpenSnackbar = useSnackbar();

  const [btnStatus, setBtnStatus] = useState({ friendship: false, followed: false, block: false });

  const friendshipRef = useRef(false);
  const followedRef = useRef(false);
  const blockedRef = useRef(false);

  const userFullName = `${user.first_name} ${user.last_name}`;

  const handleSnackbarMessage = (btnAction) => {
    console.log('amitié ? =>', friendshipRef.current)
    switch(btnAction) {
      case 'friendship':
        if(friendshipRef.current) {
          handleOpenSnackbar(`Vous avez envoyé une demande d'amitié à ${userFullName}.`)
        } else {
          handleOpenSnackbar(`Demande d'amitié annulée.`)
        }
        break;
      case 'followed':
        if(followedRef.current) {
          handleOpenSnackbar(`Vous suivez maintenant ${userFullName}.`)
        } else {
          handleOpenSnackbar(`Vous ne suivez plus ${userFullName}.`)
        }
        break;
      case 'blocked':
        if(blockedRef.current) {
          handleOpenSnackbar(`${userFullName} est maintenant bloqué.`)
        } else {
          handleOpenSnackbar(`${userFullName} est maintenant débloqué.`)
        }
        break;
      default:
        break;
    }
  }

  const handleBtnAction = async(btnAction) => {    

    switch(btnAction) {
      case 'friendship':
        setBtnStatus({ friendship: !btnStatus.friendship, followed: btnStatus.followed, block: btnStatus.block });
        friendshipRef.current = !friendshipRef.current;
        break;
      case 'followed':
        setBtnStatus({ friendship: btnStatus.friendship, followed: !btnStatus.followed, block: btnStatus.block });
        followedRef.current = !followedRef.current;
        break;
      case 'blocked':
        setBtnStatus({ friendship: btnStatus.friendship, followed: btnStatus.followed, block: !btnStatus.block });
        blockedRef.current = !blockedRef.current;
        break;
      default:
        break;
    }

    handleSnackbarMessage(btnAction)
  }

  return (
    <>
      <Stack
        spacing={3}
        direction='row'
      >
        <Stack 
          spacing={2}
          direction='row'
          alignItems='center'
          width='150px'
        >
          <UserAvatar
            userInfos={user}
            picHeight={'50px'}
            picWidth={'50px'}
            sx={null}
            redirection={true}
          />
          <Typography
            fontFamily='Pragati Narrow, sans-serif'
            color='#d3d3d3'
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </Stack>
        <Stack 
          direction='row' 
          justifyContent='space-between'
          flexGrow='1'  
        >
          <Stack 
            spacing={3}
            direction='row'
            alignItems='center' 
          >
            {contactsActionButtons.slice(0, 2).map((btn) => (
              <ContactsActionButtons 
                key={btn.id} 
                btn={btn} 
                handleBtnAction={handleBtnAction} 
                btnStatus={
                  btn.action === 'friendship' ? 
                    btnStatus.friendship
                  :
                    btnStatus.followed
                }
              />
            ))}
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
          >
            <ContactsActionButtons 
              btn={contactsActionButtons[2]} 
              handleBtnAction={handleBtnAction}
              btnStatus={btnStatus.block} 
            />
          </Stack>
        </Stack>
      </Stack>
      {
        !isLastCard &&
        <Divider 
          sx={{
            borderColor: '#122727'
          }}
        />
      }
    </>
  );
};

export default ContactsSearchCard;