export const countActiveFiltersSwipe = ( typeChosen, countryChosen, genreChosen, ratingChosen, periodChosen ) => {
  let count = 0;

  if (typeChosen !== 'all') count++; // Par défaut, c'est 'all'
  if (countryChosen.name !== 'Tous') count++; // Par défaut, on active le filtre 'US'
  if (genreChosen.id !== 0) count++; // Par défaut, c'est 'Tous'
  if (ratingChosen.number !== null) count++; // Par défaut, pas de note minimum
  if (periodChosen.id !== 0) count++; // Par défaut, c'est 'Toutes'

  return count;
};