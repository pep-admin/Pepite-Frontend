import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiBaseUrl from '@utils/request/config';

const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/login');
      return;
    }

    axios
      .get(`${apiBaseUrl}/users/user/${userId}`, { withCredentials: true })
      .then(_ => {
        setIsAuthenticated(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error(
            "Erreur lors de la vérification de l'authentification:",
            error,
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return { isAuthenticated, isLoading };
};

export default useCheckAuth;
