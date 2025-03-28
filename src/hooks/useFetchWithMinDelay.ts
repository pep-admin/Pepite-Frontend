import { useState } from 'react';

const useFetchWithMinDelay = (delay = 1000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithMinDelay = async fetchFunction => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const data = await fetchFunction();
      const elapsedTime = Date.now() - startTime;

      // Attendre que le délai minimum soit respecté
      if (elapsedTime < delay) {
        await new Promise(resolve => setTimeout(resolve, delay - elapsedTime));
      }

      return data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err; // Relance l'erreur pour permettre au composant parent de la gérer si nécessaire
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchWithMinDelay, isLoading, error };
};

export default useFetchWithMinDelay;
