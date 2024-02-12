import { countriesList } from '@utils/data/countries';
import { assetsBaseUrl } from '@utils/request/config';

// Recherche du pays choisi par l'utilisateur
export function findIsoCountry(country) {
  const findCountry = countriesList.find(
    countryDetail => countryDetail.native_name === country,
  );
  // Récupération du code ISO
  const isoCountry = findCountry.iso_3166_1;
  return isoCountry;
}

// Cherche les certifications pour chaque film / série
export function findCertificationFr(type, movieDetail) {
  let frenchRelease;
  let usRelease;
  let certification;

  if (type === 'movie') {
    frenchRelease = movieDetail.current.release_dates.results.find(
      entry => entry.iso_3166_1 === 'FR',
    );
    usRelease = movieDetail.current.release_dates.results.find(
      entry => entry.iso_3166_1 === 'US',
    );

    // Si frenchRelease existe et a des dates de sortie
    if (frenchRelease && frenchRelease.release_dates.length) {
      // Trouver la première certification non vide
      const frenchCertificationEntry = frenchRelease.release_dates.find(
        entry => entry.certification !== '' && entry.certification !== 'U',
      );

      // Si une entrée est trouvée, utilisez sa certification
      if (frenchCertificationEntry) {
        certification = frenchCertificationEntry.certification;
      }
    }

    // Si la certification n'a pas encore été trouvée, vérifiez usRelease
    if (!certification && usRelease && usRelease.release_dates.length) {
      const usCertificationEntry = usRelease.release_dates.find(
        entry => entry.certification !== '',
      );

      if (usCertificationEntry) {
        certification = usCertificationEntry.certification;
      }
    }
  } else if (type === 'tv') {
    frenchRelease = movieDetail.current.content_ratings.results.find(
      entry => entry.iso_3166_1 === 'FR',
    );
    usRelease = movieDetail.current.content_ratings.results.find(
      entry => entry.iso_3166_1 === 'US',
    );

    // Si frenchRelease existe et a des dates de sortie
    if (
      frenchRelease &&
      frenchRelease.rating !== '' &&
      frenchRelease.rating !== 'NR'
    ) {
      certification = frenchRelease.rating;
    }

    // Si la certification n'a pas encore été trouvée, vérifiez usRelease
    if (!certification && usRelease && usRelease.rating) {
      certification = usRelease.rating;
    }
  }

  let imgUrl = '';
  let alt = '';

  if (certification) {
    // Votre logique de traitement, par exemple:
    switch (certification) {
      case '':
        imgUrl = `${assetsBaseUrl}/images/no_certification.svg`;
        alt = 'Non défini';
        break;

      case 'TP':
        imgUrl = `${assetsBaseUrl}/images/TP.svg`;
        alt = 'Tous publics';
        break;

      case 'TV-Y7':
        imgUrl = `${assetsBaseUrl}/images/TP.svg`;
        alt = 'Tous publics';
        break;

      case '10':
        imgUrl = `${assetsBaseUrl}/images/moins_10.svg`;
        alt = 'Déconseillé aux moins de 10 ans';
        break;

      case 'TV-PG':
        imgUrl = `${assetsBaseUrl}/images/moins_10.svg`;
        alt = 'Déconseillé aux moins de 10 ans';
        break;

      case '12':
        imgUrl = `${assetsBaseUrl}/images/moins_12.svg`;
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case '16':
        imgUrl = `${assetsBaseUrl}/images/moins_16.svg`;
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case '18':
        imgUrl = `${assetsBaseUrl}/images/moins_18.svg`;
        alt = 'Déconseillé aux moins de 18 ans';
        break;

      case 'G':
        imgUrl = `${assetsBaseUrl}/images/TP.svg`;
        alt = 'Tous publics';
        break;

      case 'PG':
        imgUrl = `${assetsBaseUrl}/images/TP.svg`;
        alt = 'Tous publics';
        break;

      case 'PG-13':
        imgUrl = `${assetsBaseUrl}/images/moins_12.svg`;
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case 'TV-14':
        imgUrl = `${assetsBaseUrl}/images/moins_12.svg`;
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case 'R':
        imgUrl = `${assetsBaseUrl}/images/moins_16.svg`;
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case 'TV-MA':
        imgUrl = `${assetsBaseUrl}/images/moins_16.svg`;
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case 'NC-17':
        imgUrl = `${assetsBaseUrl}/images/moins_18.svg`;
        alt = 'Déconseillé aux moins de 18 ans';
        break;

      default:
        break;
    }
    return { imgUrl, alt };
  } else {
    const imgUrl = `${assetsBaseUrl}/images/no_certification.svg`;
    const alt = 'Non défini';

    return { imgUrl, alt };
  }
}
