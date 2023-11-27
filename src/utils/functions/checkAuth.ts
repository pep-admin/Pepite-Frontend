import apiBaseUrl from '@utils/request/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const checkAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/login');
      return;
    }    

    axios.get(
      `${apiBaseUrl}/users/user/${userId}`,
      { withCredentials: true }
    )
      .then(response => {
        console.log('réponse', response);        
        setIsAuthenticated(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log('error', error.response.status);
          
          navigate('/login');
        } else {
          // Gérer d'autres types d'erreurs ici
        }
      });
  }, [navigate]);

  return isAuthenticated;
};