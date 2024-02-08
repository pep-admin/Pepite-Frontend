// Import des libs externes
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import d'un fichier CSS pour éviter la surcharge de balises style dans le head
import '../../styles/animations.css';

// Import des icônes
import CircleIcon from '@mui/icons-material/Circle';

const Particles = ({ from }) => {
  const [particles, setParticles] = useState([]);

  const particlesRef = useRef(null);

  const generateParticles = () => {
    const newParticles = [];

    // Génère une explosion de 10 particules lors du clic sur la pépite footer
    for (let i = 0; i < 10; i++) {
      const animationClass = `particles animatedParticles${i}`;

      const randomColor =
        from === 'diamond'
          ? `hsl(${30 + Math.random() * 30}, ${70 + Math.random() * 30}%, ${
              38 + Math.random() * 15
            }%)`
          : `hsl(${Math.random() * 360}, 70%, 60%)`;

      newParticles.push({
        id: i,
        color: randomColor,
        size: 0.2 + Math.random() * 0.2,
        animationClass: animationClass,
        animationDuration: 0.75 + Math.random() * 1,
      });
    }
    setParticles(newParticles);

    // Nettoyage après animation
    setTimeout(() => {
      setParticles([]);
    }, 2100);
  };

  useEffect(() => {
    generateParticles();
  }, []);

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
            animationDuration: particle.animationDuration + 's',
            animationDelay: from === 'diamond' ? '350ms' : '0',
          }}
          className={`${particle.animationClass}`}
        />
      ))}
    </Box>
  );
};

Particles.propTypes = {
  from: PropTypes.string.isRequired,
};

export default Particles;
