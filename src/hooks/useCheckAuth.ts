import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assumant que vous utilisez Axios pour les requêtes HTTP
import apiBaseUrl from '@utils/request/config';

const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour suivre le chargement
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(`${apiBaseUrl}/auth/verify`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        console.log('redirection login');
        navigate('/login');
      } finally {
        setIsLoading(false); // Assurez-vous de mettre isLoading sur false une fois que la requête est terminée
      }
    };

    verifyAuth();
  }, [navigate]);

  return { isAuthenticated, isLoading }; // Retournez les deux états
};

export default useCheckAuth;
