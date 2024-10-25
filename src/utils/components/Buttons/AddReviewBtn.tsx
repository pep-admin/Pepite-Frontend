import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddReviewBtn = ({ containerRef }) => {

  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Fonction pour gérer le défilement
  const handleScroll = () => {
    let scrollTop: number;
    
    // Si containerRef est défini, on attache au conteneur, sinon à window
    if (containerRef && containerRef.current) {
      scrollTop = containerRef.current.scrollTop;
    } else {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    }

    if (scrollTop > lastScrollTop) {
      setShowButton(false); // Masquer le bouton si l'utilisateur défile vers le bas
    } else {
      setShowButton(true); // Afficher le bouton si l'utilisateur remonte
    }
    
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  // Utilisation de useEffect pour attacher/détacher l'événement de défilement
  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll); // Attacher à window si pas de container
    }

    return () => {
      if (containerRef && containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll); // Nettoyage lors du démontage
      }
    };
  }, [lastScrollTop, containerRef]);

  return (
    showButton && (
      <Fab 
        aria-label="add" 
        sx={{
          height: '50px',
          width: '50px',
          position: 'fixed', 
          bottom: 18, 
          right: 17,
          background: 'linear-gradient(310deg, rgba(21,21,21,1) 0%, rgba(40,40,40,1) 100%)',
          border: '1px solid #131313'
        }}
        onClick={() => navigate('/rating')}
      >
        <AddIcon fontSize='large' sx={{ color: '#f1f1f1' }}/>
      </Fab>
    )
  );
};

export default AddReviewBtn;
