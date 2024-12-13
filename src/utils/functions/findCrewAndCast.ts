export const findDirectorName = crew => {  
  const director = crew.find(member => member.job === 'Director');
  return director ? director.name : 'Réalisateur inconnu';
};

export const findTopActors = cast => {
  // Trie les acteurs par popularité décroissante
  const sortedCast = cast.sort((a, b) => b.popularity - a.popularity);

  // Sélectionne les trois premiers acteurs
  const topActors = sortedCast.slice(0, 3).map(actor => actor.name);

  // Vérifie si le nombre d'acteurs dépasse trois
  return topActors.join(', ');
};