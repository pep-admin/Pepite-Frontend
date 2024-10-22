import axios from 'axios';
import { apiBaseUrl } from '../config';

export const handleFriendshipRequest = async (action: string, receiver_id: number) => {

  // Envoyer une demande d'amitié
  if(action === 'send') {
    await axios.post(
      `${apiBaseUrl}/friendship/add`,
      { receiver_id: receiver_id },
      { withCredentials: true },
    );
  } 

  // Annuler une demande d'amitié
  else if(action === 'cancel') {
    await axios.delete(`${apiBaseUrl}/friendship/cancel`, {
      params: { receiver_id: receiver_id },
      withCredentials: true,
    });
  } 

  // Accepter une demande d'amitié
  else if(action === 'accept') {
    await axios.patch(
      `${apiBaseUrl}/friendship/accept`,
      { receiver_id: receiver_id },
      { withCredentials: true },
    );
  } 

  // Accepter une demande d'amitié
  else if(action === 'decline') {
    await axios.delete(
      `${apiBaseUrl}/friendship/decline`, {
        params: { receiver_id: receiver_id },
        withCredentials: true,
      }
    );
  } 

  // Supprimer un ami de sa liste
  else if(action === 'remove') {
    await axios.delete(`${apiBaseUrl}/friendship/remove`, {
      params: { receiver_id: receiver_id },
      withCredentials: true,
    });
  }

  // // Accepter une demande d'amitié
  // else if(btnAction === 'declined') {
  //   await axios.delete(`${apiBaseUrl}/friendship/decline`, {
  //     params: { receiver_id: receiver_id },
  //     withCredentials: true,
  //   });
  // } 
  
  // // Annuler une demande d'amitié
  // else if(btnAction === 'sent') {
  //   await axios.delete(`${apiBaseUrl}/friendship/cancel`, {
  //     params: { receiver_id: receiver_id },
  //     withCredentials: true,
  //   });
  // } 
  
  
  
};
