import { Stack, Avatar, Typography } from '@mui/material';
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IsNew from './IsNew';
import { OrangeRating, YellowRating } from './styledComponent';
import { convertRating } from '@utils/functions/convertRating';
import AcquaintancesMenu from './AcquaintancesMenu';

const MainItemContent = ({ type, data, movieOrSerie, list }) => {

  const navigate = useNavigate();

  const [showMutualFriends, setShowMutualFriends] = useState(null);
  const [showOtherRatings, setShowOtherRatings] = useState(null);

  const openMutualFriends = Boolean(showMutualFriends);
  const openOtherRatings = Boolean(showOtherRatings);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        variant={type === 'movies' ? 'square' : 'rounded'}
        alt={
          type === 'wanted-movies' ||
          type === 'watched-movies' ||
          type === 'rated-movies'
            ? `Poster ${
                movieOrSerie === 'movie' ? 'du film' : 'de la série'
              } ${movieOrSerie === 'movie' ? data.title : data.name}`
            : `Photo de profil de ${data.first_name} ${data.last_name}`
        }
        src={
          (type === 'wanted-movies' ||
            type === 'watched-movies' ||
            type === 'rated-movies') &&
          data.poster_path
            ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
            : type === 'movies' && !data.poster_path
            ? null
            : // Si l'utilisateur a défini une photo de profil
            data.file_path
            ? `${apiBaseUrl}/uploads/${data.file_path}`
            : // Si l'utilisateur n'a pas défini de photo de profil
              `${assetsBaseUrl}/images/default_profil_pic.png`
        }
        sx={{
          width: 50,
          height: 50,
          borderRadius:
            type === 'wanted-movies' ||
            type === 'watched-movies' ||
            type === 'rated-movies'
              ? '4px'
              : '50%',
        }}
        onClick={() =>
          type === 'wanted-movies' ||
          type === 'watched-movies' ||
          type === 'rated-movies'
            ? // TO DO : naviguer sur la page de swipe
              console.log('aller sur le swipe')
            : navigate(`/profil/${data.id}`)
        }
      />
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Stack direction="row" columnGap="5px" alignItems="center">
          <Typography
            variant="body2"
            component="h4"
            fontWeight="bold"
            whiteSpace="nowrap"
            maxWidth={type === 'rated-movies' ? "auto" : "130px"}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {type === 'wanted-movies' ||
            type === 'watched-movies' ||
            type === 'rated-movies'
              ? `${data.title || data.name}`
              : `${data.first_name} ${data.last_name}`}
          </Typography>
          <IsNew
            from={'list'}
            created_at={
              type === 'wanted-movies'
                ? data.wanted_date
                : type === 'watched-movies'
                ? data.watched_date
                : data.created_at
            }
          />
        </Stack>
        {type === 'wanted-movies' ||
        type === 'watched-movies' ||
        type === 'rated-movies' ? (
          <Stack direction="row" columnGap="3px" flexWrap="wrap">
            {type === 'rated-movies' ? (
              <>
                <OrangeRating
                  readOnly
                  value={parseInt(data.rating, 10)}
                  precision={0.5}
                  sx={{
                    position: 'relative',
                    left: '-3px',
                    bottom: '-1px',
                  }}
                />
                <Typography fontSize="0.8em" fontWeight="700">
                  {`${data.rating} / 5`}
                </Typography>
              </>
            ) : (
              <>
                <YellowRating
                  readOnly
                  value={convertRating(data.vote_average)}
                  precision={0.1}
                  sx={{
                    position: 'relative',
                    left: '-3px',
                    bottom: '-1px',
                  }}
                />
                <Typography fontSize="0.8em" fontWeight="700">
                  {`${convertRating(data.vote_average)} / 5`}
                </Typography>
              </>
            )}
            <Typography
              fontSize="0.8em"
              align="left"
              height="14.22px"
              flexBasis="100%"
              color={
                data.friends_and_followed_critics.length
                  ? 'inherit'
                  : '#B9B9B9'
              }
            >
              <>
                {data.friends_and_followed_critics.length ? (
                  <>
                    {'Noté par '}
                    <span
                      style={{ fontWeight: '600' }}
                      onClick={e => {
                        setShowOtherRatings(e.currentTarget);
                      }}
                    >
                      {`${data.friends_and_followed_critics.length} ${
                        type === 'rated-movies'
                          ? data.friends_and_followed_critics.length > 1
                            ? 'autres personnes'
                            : 'autre personne'
                          : data.friends_and_followed_critics.length > 1
                          ? 'personnes'
                          : 'personne'
                      }`}
                    </span>
                    <AcquaintancesMenu
                      page={'list'}
                      open={openOtherRatings}
                      anchorEl={showOtherRatings}
                      setAnchorEl={setShowOtherRatings}
                      infos={data.friends_and_followed_critics}
                      ratings={data.friends_and_followed_critics}
                    />
                  </>
                ) : (
                  'Noté par aucune connaissance'
                )}
              </>
            </Typography>
          </Stack>
        ) : (
          <>
            <Typography
              variant="body2"
              component="h4"
              color="primary"
              sx={{
                color: data.common_friends_details?.length
                  ? '#24A5A5'
                  : '#B9B9B9',
              }}
              onClick={e => {
                data.common_friends_details?.length
                  ? setShowMutualFriends(e.currentTarget)
                  : null;
              }}
            >
              {data.common_friends_details?.length
                ? `${data.common_friends_details.length} ami${
                    data.common_friends_details.length > 1 ? 's' : ''
                  } en commun`
                : 'Aucun ami en commun'}
            </Typography>
            <AcquaintancesMenu
              page={'contacts'}
              open={openMutualFriends}
              anchorEl={showMutualFriends}
              setAnchorEl={setShowMutualFriends}
              infos={list}
            />
          </>
        )}
      </Stack>
    </Stack>
        
  );
};

export default MainItemContent;