import { countriesList } from '@utils/data/countries';

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
    frenchRelease = movieDetail.release_dates.results.find(
      entry => entry.iso_3166_1 === 'FR',
    );
    usRelease = movieDetail.release_dates.results.find(
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
    console.log(movieDetail);

    frenchRelease = movieDetail.content_ratings.results.find(
      entry => entry.iso_3166_1 === 'FR',
    );
    usRelease = movieDetail.content_ratings.results.find(
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
        imgUrl = 'http://127.0.0.1:5173/images/no_certification.svg';
        alt = 'Non défini';
        break;

      case 'TP':
        imgUrl = 'http://127.0.0.1:5173/images/TP.svg';
        alt = 'Tous publics';
        break;

      case 'TV-Y7':
        imgUrl = 'http://127.0.0.1:5173/images/TP.svg';
        alt = 'Tous publics';
        break;

      case '10':
        imgUrl = 'http://127.0.0.1:5173/images/moins_10.svg';
        alt = 'Déconseillé aux moins de 10 ans';
        break;

      case 'TV-PG':
        imgUrl = 'http://127.0.0.1:5173/images/moins_10.svg';
        alt = 'Déconseillé aux moins de 10 ans';
        break;

      case '12':
        imgUrl = 'http://127.0.0.1:5173/images/moins_12.svg';
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case '16':
        imgUrl = 'http://127.0.0.1:5173/images/moins_16.svg';
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case '18':
        imgUrl = 'http://127.0.0.1:5173/images/moins_18.svg';
        alt = 'Déconseillé aux moins de 18 ans';
        break;

      case 'G':
        imgUrl = 'http://127.0.0.1:5173/images/TP.svg';
        alt = 'Tous publics';
        break;

      case 'PG':
        imgUrl = 'http://127.0.0.1:5173/images/TP.svg';
        alt = 'Tous publics';
        break;

      case 'PG-13':
        imgUrl = 'http://127.0.0.1:5173/images/moins_12.svg';
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case 'TV-14':
        imgUrl = 'http://127.0.0.1:5173/images/moins_12.svg';
        alt = 'Déconseillé aux moins de 12 ans';
        break;

      case 'R':
        imgUrl = 'http://127.0.0.1:5173/images/moins_16.svg';
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case 'TV-MA':
        imgUrl = 'http://127.0.0.1:5173/images/moins_16.svg';
        alt = 'Déconseillé aux moins de 16 ans';
        break;

      case 'NC-17':
        imgUrl = 'http://127.0.0.1:5173/images/moins_18.svg';
        alt = 'Déconseillé aux moins de 18 ans';
        break;

      default:
        break;
    }
    return { imgUrl, alt };
  } else {
    console.log('Aucune certification trouvée');
    const imgUrl = 'http://127.0.0.1:5173/images/no_certification.svg';
    const alt = 'Non défini';

    return { imgUrl, alt };
  }
}
