import { Stack } from '@mui/material';
import ContactsSuggested from './ContactsSuggested';
import ContactsFriendsRequests from './ContactsFriendsRequests';

const ContactsTopContent = ({
  contactsFrom,
  contactsSectionIndex,
  friendsRequests,
  onUpdate,
}) => {
  return (
    <Stack padding="30px 5vw 40px 5vw">
      {contactsSectionIndex === 0 ? (
        <ContactsFriendsRequests
          friendsRequestsCount={friendsRequests.length}
          friendsRequests={friendsRequests}
          onUpdate={onUpdate}
        />
      ) : (
        <ContactsSuggested
          contactsFrom={contactsFrom}
          contactsSectionIndex={contactsSectionIndex}
        />
      )}
    </Stack>
  );
};

export default ContactsTopContent;
