// Import des libs externes
import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import { Item } from '@utils/components/styledComponent';
import MainItemList from '@utils/components/MainItemList';

const ContactsFriendsFollowed = ({
  contactsType,
  contactsList,
  getRequest,
  getRequest2,
}) => {
  return (
    <Item overflow="scroll" maxheight="250px" flexgrow="1" marginbottom="10px">
      <Stack
        direction="row"
        height="27px"
        alignItems="center"
        justifyContent="space-between"
        padding="0 10px"
      >
        <Stack direction="row" alignItems="center" columnGap="5px">
          <Typography
            variant="body2"
            component="p"
            lineHeight="normal"
            fontWeight="600"
          >
            {contactsType === 'requests'
              ? "Demandes d'amitié"
              : contactsType === 'friends'
              ? 'Amis'
              : 'Suivis'}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            bgcolor="#E7AE1A"
            height="15px"
            width="15px"
            borderRadius="50%"
          >
            <Typography component="span" fontSize="0.8em" fontWeight="600">
              {contactsList.length}
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="body2"
          component="p"
          fontWeight="600"
          sx={{
            cursor: 'pointer',
          }}
        >
          {(contactsType === 'friends' && contactsList.length >= 1) ||
          (contactsType === 'followed' && contactsList.length >= 1)
            ? 'Voir tous'
            : contactsType === 'followed' && contactsList.length >= 1
            ? 'Voir toutes'
            : null}
        </Typography>
      </Stack>
      <Divider />
      {contactsList.length ? (
        contactsList.map((item, index) => {
          return (
            <MainItemList
              key={item.id}
              movieOrSerie={null}
              type={contactsType}
              data={item}
              getRequest={getRequest}
              getRequest2={getRequest2}
              isLast={index === contactsList.length - 1}
            />
          );
        })
      ) : (
        <Stack direction="column">
          <Typography variant="body2" padding="10px 0">
            <>
              <span style={{ fontWeight: 'bold' }}>
                {`Aucun${
                  contactsType === 'requests'
                    ? "e demande d'amitié"
                    : contactsType === 'friends'
                    ? 'e amitié'
                    : ' suivi '
                }
                  `}
              </span>
              {' pour le moment.'}
            </>
          </Typography>
        </Stack>
      )}
    </Item>
  );
};

ContactsFriendsFollowed.propTypes = {
  contactsType: PropTypes.string.isRequired,
  contactsList: PropTypes.array.isRequired,
  getRequest: PropTypes.func.isRequired,
  getRequest2: PropTypes.func,
};

export default ContactsFriendsFollowed;
