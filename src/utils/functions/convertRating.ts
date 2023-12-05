export const convertRating = rating => {
  const originalScore = parseFloat(rating);
  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

  return roundedScore;
};
