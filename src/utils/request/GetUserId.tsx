// Import des libs externes
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import du contexte
import { useData } from '@hooks/DataContext';

const GetUserId = () => {
  const { setUserId } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:8800/api/auth/validate_token`,
          withCredentials: true,
        });

        const userId = response.data.id.toString();
        setUserId(userId);
      } catch (error) {
        console.error('Erreur de validation du token', error);
        navigate('/login');
      }
    };

    getUserData();
  }, [setUserId, navigate]);

  return null;
};

export default GetUserId;
