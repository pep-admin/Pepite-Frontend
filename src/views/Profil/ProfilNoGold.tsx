// Import des libs externes
import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants internes
import { GoldNuggetIcon } from '@utils/styledComponent';

const ProfilNoGold = ({
  // page,
  userInfos,
  chosenUser,
}) => {
  const { id } = useParams();
  const { displayType } = useData();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
      bgcolor="#f1f1f1"
      borderRadius="10px"
    >
      <GoldNuggetIcon sx={{ fontSize: '4em' }} />
      <Stack direction="column" spacing={1} marginTop="2px">
        <Typography variant="body1" component="h4" align="center">
          {userInfos.id === parseInt(id, 10)
            ? `Vous n'avez encore aucune pépite.`
            : `${chosenUser?.first_name} n'a encore aucune pépite.`}
        </Typography>
        <Typography variant="body2" component="p" align="center">
          {userInfos.id === parseInt(id, 10) ? (
            <>
              <span style={{ fontWeight: 'bold' }}>Publiez une critique </span>
              depuis votre profil
            </>
          ) : (
            <>
              N&apos;hésitez pas à{' '}
              <span style={{ fontWeight: 'bold' }}>
                lui conseiller un film !
              </span>
            </>
          )}
        </Typography>
        {userInfos.id === parseInt(id, 10) && displayType === 'movie' ? (
          <Typography variant="body2" component="p" align="center">
            <>
              <span style={{ fontWeight: 'bold' }}>Conseillez un film </span>sur
              le profil de vos amis !
            </>
          </Typography>
        ) : userInfos.id === parseInt(id, 10) && displayType === 'tv' ? (
          <Typography variant="body2" component="p" align="center">
            <>
              <span style={{ fontWeight: 'bold' }}>Conseillez une série </span>
              sur le profil de vos amis !
            </>
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
};

ProfilNoGold.propTypes = {
  userInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  // page: PropTypes.string,
};

export default ProfilNoGold;
