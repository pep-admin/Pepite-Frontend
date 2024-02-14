import { useState, useEffect } from 'react';
import axios from 'axios';

import { getAbout } from './getAbout'; // Assurez-vous que le chemin d'importation est correct

export function useAbout() {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAboutInfo = async () => {
      setData(undefined);
      setIsLoading(true);
      try {
        const aboutData = await getAbout();
        setData(aboutData);
        setError('');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Gestion des erreurs Axios
          setError(err.response?.data.message || "Une erreur s'est produite");
        } else {
          // Gestion des erreurs non Axios
          setError("Une erreur s'est produite");
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  return { data, isLoading, error };
}
