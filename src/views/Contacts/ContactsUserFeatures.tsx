// Import des libs externes
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import FriendRequestBtn from '@utils/components/FriendRequestBtn';
import { Item } from '@utils/components/styledComponent';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des variables d'environnement
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

// Import des requêtes
import { countCriticsAndGoldUser } from '@utils/functions/countCriticsAndGoldUser';
import { getCommonNuggetsRequest } from '@utils/request/goldNugget/getCommonNuggetsRequest';

const ContactsUserFeatures = ({
  page,
  userInfos,
  getFriendsRequests,
  getFriends,
  getFollowed,
}) => {
  const { displayType } = useData();

  const [criticsNumber, setCriticsNumber] = useState(0);
  const [goldNuggetsNumber, setGoldNuggetsNumber] = useState(0);
  const [commonNuggets, setCommonNuggets] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const { criticsNumber, goldNuggetsNumber } =
        await countCriticsAndGoldUser(userInfos.id);
      setCriticsNumber(criticsNumber);
      setGoldNuggetsNumber(goldNuggetsNumber);
    };

    const getCommonNuggets = async () => {
      const response = await getCommonNuggetsRequest(userInfos.id, displayType);
      setCommonNuggets(response);
    };

    fetchCounts();
    getCommonNuggets();
  }, []);

  return (
    <Item>
      <Stack padding="20px 4%">
        <Stack direction="row" columnGap="20px" marginBottom="15px">
          <Avatar
            alt={`photo de profil de ${userInfos.first_name} ${userInfos.last_name}`}
            src={
              userInfos.file_path
                ? `${apiBaseUrl}/Uploads/${userInfos.file_path}`
                : `${assetsBaseUrl}/images/default_profil_pic.png`
            }
            sx={{
              height: 90,
              width: 90,
              boxShadow: '0px 3px 3.7px rgba(0, 0, 0, 0.30)',
            }}
          />
          <Stack alignItems="flex-start" justifyContent="space-evenly">
            <Typography fontSize="1.3em" fontWeight="600">
              {`${userInfos.first_name} ${userInfos.last_name}`}
            </Typography>
            <Typography>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'orange',
                  height: '20px',
                  width: '20px',
                  borderRadius: '20px',
                  fontWeight: 600,
                }}
              >
                {`${criticsNumber}`}
              </span>
              {` note${criticsNumber > 1 ? 's' : ''}`}
            </Typography>
            <Typography>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#E7AE1A',
                  height: '20px',
                  width: '20px',
                  borderRadius: '20px',
                  fontWeight: 600,
                }}
              >
                {`${goldNuggetsNumber}`}
              </span>
              {` pépite${goldNuggetsNumber > 1 ? 's' : ''}`}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack marginTop="15px">
          <Stack direction="row" alignItems="center" marginBottom="10px">
            <Typography align="left" fontSize="1.2em" fontWeight="600">
              {'Pépites en commun'}
            </Typography>
            <Box
              height="20px"
              width="20px"
              bgcolor="#E7AE1A"
              borderRadius="50%"
              marginLeft="10px"
            >
              <Typography fontWeight="600">
                {`${userInfos.count_common_gold_nuggets}`}
              </Typography>
            </Box>
          </Stack>
          <Stack marginBottom="15px">
            {commonNuggets.length ? (
              commonNuggets.map(movie => {
                return (
                  <Stack
                    direction="row"
                    key={movie.id}
                    alignItems="center"
                    columnGap="10px"
                  >
                    <Avatar
                      variant="rounded"
                      alt={`poster de ${movie.title}`}
                      src={
                        movie.poster_path &&
                        `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      }
                      sx={{
                        height: 60,
                        width: 60,
                        boxShadow: '0px 3px 3.7px rgba(0, 0, 0, 0.30)',
                      }}
                    ></Avatar>
                    <Typography fontSize="1.2em">{`${movie.title}`}</Typography>
                  </Stack>
                );
              })
            ) : (
              <Typography align="left">
                {`Vous n'avez encore aucune pépite en commun avec ${userInfos.first_name} ${userInfos.last_name}.`}
              </Typography>
            )}
          </Stack>
          <Divider />
          <Stack alignItems="center" marginTop="18px">
            <FriendRequestBtn
              page={page}
              userInfos={userInfos}
              getFriendsRequests={getFriendsRequests}
              getFriends={getFriends}
              getFollowed={getFollowed}
            />
          </Stack>
        </Stack>
      </Stack>
    </Item>
  );
};

ContactsUserFeatures.propTypes = {
  page: PropTypes.string.isRequired,
  userInfos: PropTypes.object,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default ContactsUserFeatures;
