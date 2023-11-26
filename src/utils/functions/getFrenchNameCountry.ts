import { countriesList } from '@utils/data/Countries';

// Récupération des noms en Français de pays producteurs du film
export const findFrenchNameCountry = countries => {
  let frenchCountryNames;

  if (countries.length === 0) {
    frenchCountryNames = ['Non spécifié'];
  } else {
    // Tableau des noms français des pays
    frenchCountryNames = countries.map(({ iso_3166_1 }) => {
      const findCountry = countriesList.find(
        country => country.iso_3166_1 === iso_3166_1,
      );
      return findCountry ? findCountry.native_name : iso_3166_1;
    });
  }

  return frenchCountryNames;
};
