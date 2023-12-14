// Import des libs externes
import { Box } from '@mui/material';
import { useRef } from 'react';
import PropTypes from 'prop-types';

// Import d'un fichier CSS pour éviter la surcharge de balises style dans le head
import '../../styles/animations.css';

// Import des icônes
import CircleIcon from '@mui/icons-material/Circle';

const Particles = ({ particles }) => {
  const particlesRef = useRef(null);

  return (
    <Box
      ref={particlesRef}
      sx={{
        position: 'absolute',
        height: '18px',
        width: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {particles.map(particle => (
        <CircleIcon
          key={particle.id}
          style={{
            fontSize: `${particle.size}em`,
            color: particle.color,
          }}
          className={`${particle.animationClass}`}
        />
      ))}
    </Box>
  );
};

Particles.propTypes = {
  particles: PropTypes.array.isRequired,
};

export default Particles;
