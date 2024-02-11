import { formatDateTime } from './formatDate';

export function getBuildDate() {
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === 'development';
  const buildDate = import.meta.env.VITE_BUILD_DATE || 'Date non disponible';

  return formatDateTime(isDevelopment ? undefined : buildDate);
}
