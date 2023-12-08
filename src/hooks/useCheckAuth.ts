import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@utils/request/users/getUser';

const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async userId => {
    try {
      const userData = await getUser(userId); // Récupération des informations de l'utilisateur
      localStorage.setItem('user_infos', JSON.stringify(userData)); // Stockage dans le local storage
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error,
        );
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    // Si l'id de l'utilisateur est absent du local storage, redirection vers /login
    if (!userId) {
      navigate('/login');
      return;
    }

    checkUser(userId);
  }, [navigate]);

  return { isAuthenticated, isLoading };
};

export default useCheckAuth;
