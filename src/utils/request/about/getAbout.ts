import axios from 'axios';
import apiBaseUrl from '../config';

export async function getAbout() {
  try {
    const response = await axios.get(`${apiBaseUrl}/about`, {
      withCredentials: true,
    });
    console.log('Informations "À propos" récupérées :', response.data);
    return response.data; // Retourne les données récupérées
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations 'À propos' :",
      error,
    );
    throw error; // Propage l'erreur pour un traitement ultérieur
  }
}
