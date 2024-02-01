import useCheckAuth from '@hooks/useCheckAuth';
import ProfilComponent from '@views/Profil/ProfilComponent';

const ProfilContainer = () => {
  const { isAuthenticated } = useCheckAuth();

  // Si l'utilisateur n'est pas authentifié, ne rien rendre (ou rendre un composant spécifique)
  if (!isAuthenticated) {
    return null;
  }

  return <ProfilComponent />;
};

export default ProfilContainer;
