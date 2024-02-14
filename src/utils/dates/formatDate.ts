import { DATE_FORMAT_OPTIONS } from './consts/dateFormatOptions';

export function formatDateTime(date: string | undefined) {
  if (!date || isNaN(new Date(date).getTime())) {
    return 'Date non disponible';
  }

  console.log('date', date);

  return new Intl.DateTimeFormat('fr-FR', DATE_FORMAT_OPTIONS).format(
    new Date(date),
  );
}
