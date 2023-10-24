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
    const JsonDetails = localStorage.getItem(key);
    if (JsonDetails) {
      const parsed = JSON.parse(JsonDetails);
      const details = parsed[0];
      movieDetailsArray.push(details);
    }
  });

  // Récupération de tous les détails des séries
  serieKeys.forEach(key => {
    const JsonDetails = localStorage.getItem(key);
    if (JsonDetails) {
      const parsed = JSON.parse(JsonDetails);
      const details = parsed[0];
      serieDetailsArray.push(details);
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
