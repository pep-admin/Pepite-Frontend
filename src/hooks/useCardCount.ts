import { useState, useEffect } from 'react';

// Ce hook calcule le nombre de cards à afficher, selon la hauteur du conteneur principal et selon la hauteur de la card + margin
const useCardCount = (ref, cardHeight: number, spacing: number) => {
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    const calculateCardCount = () => {
      if (ref.current) {
        const containerHeight = ref.current.clientHeight || 0;
        const totalCardHeight = cardHeight + spacing; // Hauteur card + espace entre cards
        const count = Math.floor(containerHeight / totalCardHeight);
        setCardCount(count);
      }
    };

    // Calcul initial
    calculateCardCount();

    // Recalculer lors des redimensionnements de la fenêtre
    window.addEventListener('resize', calculateCardCount);

    // Nettoyer l'écouteur
    return () => window.removeEventListener('resize', calculateCardCount);
  }, [ref, cardHeight, spacing]);

  return cardCount;
};

export default useCardCount;
