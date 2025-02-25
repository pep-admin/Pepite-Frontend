// Détermine le nombre de skeletons en fonction de la largeur de l'écran
export const calculateSkeletonCount = (
  boxWidth: number,
  windowDecimal: number,
  setSkeletonCount,
) => {
  const cardWidth = boxWidth; // Largeur approximative d'une card
  const availableWidth = window.innerWidth * windowDecimal; // Marge de 10vw pour le padding
  setSkeletonCount(Math.floor(availableWidth / cardWidth));
};
