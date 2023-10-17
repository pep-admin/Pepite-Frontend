import { countries } from '@utils/data/countries';

export function findIsoCountry(country) {
  // Recherche du pays choisi par l'utilisateur
  const findCountry = countries.find(
    countryDetail => countryDetail.native_name === country,
  );
  // Récupération du code ISO
  const isoCountry = findCountry.iso_3166_1;
  return isoCountry;
}
