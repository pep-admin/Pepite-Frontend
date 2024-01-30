import { useState, useEffect } from 'react';

export const useCardsToShow = (cardWidth, gap, additionalCards) => {
  const [cardsToShow, setCardsToShow] = useState(0);

  useEffect(() => {
    const calculateCardsToShow = () => {
      const viewportWidth = window.innerWidth;
      const numberOfCards =
        Math.floor(viewportWidth / (cardWidth + gap)) + additionalCards;
      setCardsToShow(numberOfCards);
    };

    calculateCardsToShow(); // Calcul initial

    window.addEventListener('resize', calculateCardsToShow); // Ajustement lors du redimensionnement

    return () => window.removeEventListener('resize', calculateCardsToShow); // Nettoyage
  }, [cardWidth, gap, additionalCards]);

  return cardsToShow;
};
