export const formatRating = rating => {
  // Si la note a une partie décimale autre que .0, retourner la note telle quelle
  if (rating % 1 !== 0) {
    return rating.toString();
  }
  // Sinon, retourner la note sans la partie décimale
  return Math.floor(rating).toString();
};
