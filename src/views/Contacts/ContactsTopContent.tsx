import { Stack } from '@mui/material';
import ContactsSuggested from './ContactsSuggested';
import ContactsFriendsRequests from './ContactsFriendsRequests';

const ContactsTopContent = ({ contactsFrom, contactsSectionIndex, friendsRequests, loadingContacts}) => {
  return (
    <Stack
      spacing={8}
      padding='30px 5vw 40px 5vw'
    >
      { contactsSectionIndex === 0 ?
        <ContactsFriendsRequests friendsRequests={friendsRequests} loadingContacts={loadingContacts} />
        :
        <ContactsSuggested contactsFrom={contactsFrom} />
      }
    </Stack>
  )
};

export default ContactsTopContent;