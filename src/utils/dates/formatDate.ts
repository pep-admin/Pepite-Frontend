import { DATE_FORMAT_OPTIONS } from './consts/dateFormatOptions';

export function formatDateTime(date: string | undefined) {
  return new Intl.DateTimeFormat('fr-FR', DATE_FORMAT_OPTIONS).format(
    new Date(date),
  );
}
