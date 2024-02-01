// Import des libs externes
import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

const ProfilNoGold = ({ page, loggedUserInfos, chosenUser }) => {
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
      <img
        src="/images/no_gold.svg"
        alt=""
        style={{
          position: 'relative',
          top: '0.2px',
          filter: 'grayscale(1) brightness(0.95)',
        }}
      />
      <Stack direction="column" spacing={1} marginTop="10px" padding="0 5px">
        <Typography fontSize="1em" component="h4" align="center">
          {loggedUserInfos.id === parseInt(id, 10) && page === 'profil'
            ? `Vous n'avez encore aucune pépite.`
            : loggedUserInfos.id != parseInt(id, 10) && page === 'profil'
            ? `${chosenUser?.first_name} n'a encore aucune pépite.`
            : "Vos contacts n'ont encore partagé aucune pépite."}
        </Typography>
        <Typography variant="body2" component="p" align="center">
          {loggedUserInfos.id === parseInt(id, 10) && page === 'profil' ? (
            <>
              <span style={{ fontWeight: 'bold' }}>
                {'Publiez une critique '}
              </span>
              {displayType === 'movie'
                ? "d'un de vos films préférés !"
                : "d'une de vos séries préférées !"}
            </>
          ) : loggedUserInfos.id !== parseInt(id, 10) && page === 'profil' ? (
            <>
              {"N'hésitez pas à "}
              <span style={{ fontWeight: 'bold' }}>
                {'lui conseiller un film !'}
              </span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 'bold' }}>{'Suivez '}</span>
              {'de nouvelles personnes ou '}
              <span style={{ fontWeight: 'bold' }}>{'ajoutez '}</span>
              {'vos amis !'}
            </>
          )}
        </Typography>
        {loggedUserInfos.id === parseInt(id, 10) &&
        displayType === 'movie' &&
        page === 'profil' ? (
          <Typography variant="body2" component="p" align="center">
            <>
              <span style={{ fontWeight: 'bold' }}>Conseillez un film </span>sur
              le profil de vos amis !
            </>
          </Typography>
        ) : loggedUserInfos.id === parseInt(id, 10) &&
          displayType === 'tv' &&
          page === 'profil' ? (
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
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  page: PropTypes.string,
};

export default ProfilNoGold;
