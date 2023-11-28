export function convertDate(timestamp) {
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  const date = new Date(timestamp);
  const day = date.getDate(); // Obtient le jour du mois
  const month = months[date.getMonth()]; // Obtient le mois (0-11, donc nécessite un tableau pour la conversion)
  const year = date.getFullYear(); // Obtient l'année

  return `Le ${day} ${month} ${year}`; // Formatte la date
}
