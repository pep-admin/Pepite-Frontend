// Import des libs externes
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const IsNew = ({ from, created_at }) => {
  const [isNew, setIsNew] = useState(false);

  // Vérifie si la critique ou le conseil a moins de 3 jours (bandeau "New")
  const checkIfNew = () => {
    const createdAt = new Date(created_at).getTime();

    if (!isNaN(createdAt)) {
      const currentDate = new Date().getTime(); // Convertir en timestamp

      const diffTime = Math.abs(currentDate - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        setIsNew(true);
      }
    }
  };

  useEffect(() => {
    checkIfNew();
  }, []);

  if (isNew)
    return (
      <Typography
        component="span"
        fontStyle="italic"
        sx={{
          whiteSpace: 'nowrap',
          fontSize: from === 'list' ? '0.7em' : '0.8em',
          padding: from === 'list' ? '1px 3px ' : '0 5px',
          backgroundColor: '#5ac164',
          color: '#fff',
          lineHeight: from === 'list' ? '10px' : '1.5',
          position: from === 'list' ? 'static' : 'relative',
          top: from === 'list' ? '0' : '4px',
        }}
      >
        {'New !'}
      </Typography>
    );
  else return null;
};

IsNew.propTypes = {
  from: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default IsNew;
