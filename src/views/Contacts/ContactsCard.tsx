import { Divider, Stack, Typography } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { useSnackbar } from '@hooks/SnackbarContext';
import { useEffect, useState } from 'react';
import { handleFriendshipRequest } from '@utils/request/friendship/handleFrienshipRequest';
import ContactsButton from './ContactsButton';
import { friendshipButtons, otherButtons } from '@utils/data/contactsButtons';
import { getRelationStatusRequest } from '@utils/request/friendship/getRelationStatusRequest';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { handleFollowedRequest } from '@utils/request/followed/handleFollowedRequest';
import ContactsSkeleton from './ContactsSkeleton';

const ContactsCard = ({ user, isLastCard, onUpdate }) => {
  const handleOpenSnackbar = useSnackbar();  

  const [isRelationLoading, setIsRelationLoading] = useState(true);
  const [relationship, setRelationship] = useState({
    friendship: null,
    follow: null,
    block: null,
    user_id: null
  });

  const userFullName = `${user.first_name} ${user.last_name}`;

  // Obtenir le statut de la relation
  const getRelationshipStatus = async () => {
    try {
      setIsRelationLoading(true);
      const relation = await getRelationStatusRequest(user.id);
      setRelationship(({ 
          friendship: relation.friendship, 
          follow: relation.follow, 
          block: false,
          user_id: relation.user_id 
      }));

    } catch (error) {
      console.error(error);

    } finally {
      setIsRelationLoading(false);
    }
  };

  const handleBtnAction = async (actionType) => {
    
    try {
      // console.log('action =>', actionType);
      
      switch (actionType) {

        // Envoyer une demande d'ami
        case 'send':
          setRelationship({ ...relationship, friendship: 'sent' });
          await handleFriendshipRequest('send', user.id);
          handleOpenSnackbar(`Vous avez envoyé une demande d'amitié à ${userFullName}.`);
          break;

        // Annuler une demande d'ami
        case 'cancel':
          setRelationship({ ...relationship, friendship: 'none' });
          await handleFriendshipRequest('cancel', user.id);
          handleOpenSnackbar(`Demande d'amitié annulée.`);
          break;
        
        // Accepter une demande d'ami
        case 'accept':
          setRelationship({ ...relationship, friendship: 'accepted' });
          await handleFriendshipRequest('accept', user.id);
          handleOpenSnackbar(`Vous avez accepté la demande d'amitié de ${userFullName}.`);
          break;

        // Refuser une demande d'ami
        case 'decline':
          setRelationship({ ...relationship, friendship: 'none' });
          await handleFriendshipRequest('decline', user.id);
          break;

        // Supprimer un ami
        case 'remove':
          setRelationship({ ...relationship, friendship: 'none' });
          await handleFriendshipRequest('remove', user.id);
          handleOpenSnackbar(`Amitié avec ${userFullName} supprimée.`);
          break;

        // Suivre une personne
        case 'follow':
          setRelationship({ ...relationship, follow: 'followed' });
          await handleFollowedRequest(true, user.id);
          handleOpenSnackbar(`Vous suivez maintenant ${userFullName}.`);
          break;

        // Ne plus suivre une personne
        case 'unfollow':
          setRelationship({ ...relationship, follow: 'unfollowed' });
          await handleFollowedRequest(false, user.id);
          handleOpenSnackbar(`Vous ne suivez plus ${userFullName}.`);
          break;
  
        default:
          break;
      }

      onUpdate();
        
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getRelationshipStatus(); // Charger le statut de la relation au montage du composant
  }, []);

  return (
    <>
      {
        isRelationLoading ?
          <ContactsSkeleton />
        :
        <Stack spacing={3} direction='row'>
          <Stack spacing={2} direction='row' alignItems='center' width='150px'>
            <UserAvatar 
              userInfos={user} 
              picHeight={'50px'} 
              picWidth={'50px'} 
              sx={null} 
              redirection={true} 
              onSelect={null}
            />
            <Typography fontFamily='Pragati Narrow, sans-serif' color='#d3d3d3'>
              {userFullName}
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' flexGrow='1'>
            <Stack spacing={2} direction='row' alignItems='center'>
              {
                // Si les deux utilisateurs sont amis
                relationship.friendship === 'accepted' ?
                  <HowToRegIcon 
                    sx={{ 
                      color: '#e7ae1ad9', 
                      fontSize: '30px', 
                      position: 'relative', 
                      left: '2px' 
                    }} 
                  />
                
                // Si l'utilisateur a envoyé une demande
                : relationship.friendship === 'sent' ?
                  <ContactsButton 
                    btn={friendshipButtons[2]} 
                    handleBtnAction={handleBtnAction} 
                  />

                // Si l'utilisateur a reçu une demande
                : relationship.friendship === 'received' ?
                  // Boutons pour accepter et décliner l'invitation
                  <>
                    <ContactsButton 
                      btn={friendshipButtons[1]} 
                      handleBtnAction={handleBtnAction}
                    />
                    <ContactsButton   
                      btn={friendshipButtons[4]} 
                      handleBtnAction={handleBtnAction}
                    />
                  </> 
                : <ContactsButton 
                    btn={friendshipButtons[0]} 
                    handleBtnAction={handleBtnAction}
                  />
              }
            </Stack>
            <Stack spacing={2} direction='row' alignItems='center'>
              {
                // Si ami, on affiche le bouton pour supprimer l'amitié
                relationship.friendship === 'accepted' ?
                  <ContactsButton 
                    btn={friendshipButtons[3]} 
                    handleBtnAction={handleBtnAction}
                  />
                
                // Si suivi, on affiche l'icône "suivi"
                : relationship.follow === 'followed' ?
                  <ContactsButton 
                    btn={otherButtons[1]} 
                    handleBtnAction={handleBtnAction}
                  />

                // Si non ami et non suivi, on affiche l'icône "non suivi"
                : <ContactsButton 
                    btn={otherButtons[0]} 
                    handleBtnAction={handleBtnAction}
                  />
              }
              { // Icône utilisateur bloqué
                relationship.block === 'blocked' ?
                  <ContactsButton 
                    btn={otherButtons[3]} 
                    handleBtnAction={handleBtnAction}
                  />

                // Icône pour bloquer
                : <ContactsButton 
                  btn={otherButtons[2]} 
                  handleBtnAction={handleBtnAction}
                /> 
              }
            </Stack>
          </Stack>
        </Stack>
      }
      {!isLastCard && <Divider sx={{ borderColor: '#122727' }} />}
    </>
  );
};

export default ContactsCard;
