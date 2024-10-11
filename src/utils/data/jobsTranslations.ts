const jobTranslations = {
  'Director': 'Réalisateur',
  'Producer': 'Producteur',
  'Executive Producer': 'Producteur exécutif',
  'Co-Producer': 'Co-producteur',
  'Co-Director': 'Co-réalisateur',
  'Associate Producer': 'Producteur associé',
  'Writer': 'Scénariste',
  'Story': 'Scénariste',
  'Screenplay': 'Scénariste',
  'Composer': 'Compositeur',
  'Director of Photography': 'Directeur de la photographie',
  'Editor': 'Monteur',
  'Production Designer': 'Chef décorateur',
  'Art Director': 'Directeur artistique',
  'Stunt Coordinator': 'Coordinateur des cascades',
  'Visual Effects Supervisor': 'Superviseur des effets visuels',
  'Special Effects': 'Effets spéciaux'
};

// Fonction pour obtenir la traduction d'un rôle
export const translateJob = (job) => jobTranslations[job] || job;
