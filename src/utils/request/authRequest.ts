import axios from 'axios';
import apiBaseUrl from './config';

// Déconnexion de l'utilisateur
export const handleLogout = async () => {
  try {
    const logoutResponse = await axios.post(
      `${apiBaseUrl}/auth/logout`,
      {},
      { withCredentials: true },
    );
    if (logoutResponse.status !== 200) {
      throw new Error('Déconnexion impossible');
    }
  } catch (err) {
    console.error('Erreur durant la déconnexion :', err.message);
  }
};
