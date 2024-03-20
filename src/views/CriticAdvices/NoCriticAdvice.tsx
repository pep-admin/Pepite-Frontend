// Import des libs externes
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { Item } from '@utils/components/styledComponent';

const NoCriticAdvice = () => {
  return (
    <Item minheight="175px" marginbottom="10px">
      <Stack height="175px" justifyContent="center">
        <Typography>{'Aucun contenu à afficher pour le moment.'}</Typography>
      </Stack>
    </Item>
  );
};

NoCriticAdvice.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NoCriticAdvice;
