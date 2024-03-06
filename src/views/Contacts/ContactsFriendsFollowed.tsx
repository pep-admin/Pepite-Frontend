import React, { useEffect, useState } from 'react';

// Import des composants internes
import { Item } from '@utils/components/styledComponent';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { getFollowedList } from '@utils/request/followed/getFollowedList';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { useParams } from 'react-router-dom';
import MainItemList from '@utils/components/MainItemList';

const ContactsFriendsFollowed = ({ contactsType }) => {

  const { id } = useParams();

  const [friendRequestList, setFriendRequestList] = useState([]); // Liste des demandes d'amitié
  const [friendsList, setFriendsList] = useState([]); // Liste des amis
  const [followedList, setFollowedList] = useState([]); // Liste des suivis

  const listArray = 
    contactsType === 'requests' ?
      friendRequestList
    : contactsType === 'friends' ?
      friendsList
    : followedList;

  // Récupération des demandes d'amis
  const getFriendsRequests = async () => {
    const askList = await getFriendRequestList();
    setFriendRequestList(askList);
  };

  // Récupération de la liste d'amis
  const getFriends = async () => {
    const friendsList = await getFriendsList(id);
    setFriendsList(friendsList);
  };

  // Récupération des suivis
  const getFollowed = async () => {
    const followedList = await getFollowedList(id);
    setFollowedList(followedList);
  };

  useEffect(() => {
    getFriendsRequests();
    getFriends();
    getFollowed();
  }, []);  

  return (
    <Item overflow="scroll" maxheight="250px" flexgrow='1' marginbottom='10px'>
      <Stack
        direction="row"
        height="27px"
        alignItems="center"
        justifyContent="space-between"
        padding="0 10px"
      >
        <Stack direction='row' alignItems='center' columnGap='5px'>
          <Typography variant="body2" component="p" lineHeight='normal' fontWeight="600">
            { contactsType === 'requests' ?
              'Demandes d\'amitié'
              : contactsType === 'friends' ?
              'Amis'
              :
              'Suivis'
            }
          </Typography>
          <Box
            display='flex'
            justifyContent='center'
            bgcolor='#E7AE1A'
            height='15px'
            width='15px'
            borderRadius='50%'
          >
            <Typography component='span' fontSize='0.8em' fontWeight='600'>
              {
                contactsType === 'requests' ?
                  friendRequestList.length
                : contactsType === 'friends' ?
                  friendsList.length
                : followedList.length
              }
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
          {
            (contactsType === 'friends' && friendsList.length >= 1) ||
            (contactsType === 'followed' && followedList.length >= 1) ? 
            'Voir tous' 
            : (contactsType === 'followed' && friendRequestList.length >= 1) ? 
            'Voir toutes'
            : null
          }
        </Typography>
      </Stack>
      <Divider />
      {listArray.length ? (
        listArray.map((movie, index) => {
          return (
            <MainItemList
              key={movie.id}
              movieOrSerie={null}
              type={contactsType}
              data={movie}
              list={listArray}
              getRequest={
                contactsType === 'requests' ? 
                  getFriendRequestList
                : contactsType === 'friends' ?
                  getFriendsList
                : getFollowed
              }
              getRequest2={null}
              isLast={index === listArray.length - 1}
            />
          );
        })
      ) : (
        <Stack direction="column">
          <Typography variant="body2" padding='10px 0'>
            <>
              <span style={{ fontWeight: 'bold' }}>
                {
                  `Aucun${contactsType === 'requests' ? 'e demande d\'amitié' 
                  : contactsType === 'friends' ?
                    'e amitié'
                  : 'suivi '}
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

export default ContactsFriendsFollowed;