export function getAllLocalStorage() {
  const movieKeys = [];
  const serieKeys = [];
  const movieDetailsArray = [];
  const serieDetailsArray = [];

  // Récupération de toutes les clés commençant par 'movieDetails' ou 'serieDetails'
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movieDetails-')) {
      movieKeys.push(key);
    } else if (key && key.startsWith('serieDetails-')) {
      serieKeys.push(key);
    }
  }

  // Récupération de tous les détails des films
  movieKeys.forEach(key => {
    const details = localStorage.getItem(key);
    if (details) {
      movieDetailsArray.push(JSON.parse(details));
    }
  });

  // Récupération de tous les détails des séries
  serieKeys.forEach(key => {
    const details = localStorage.getItem(key);
    if (details) {
      serieDetailsArray.push(JSON.parse(details));
    }
  });

  console.log('les films', movieDetailsArray);
  console.log('les séries', serieDetailsArray);

  // Suppression du local storage
  localStorage.clear();

  return {
    movies: movieDetailsArray,
    series: serieDetailsArray,
  };
}
