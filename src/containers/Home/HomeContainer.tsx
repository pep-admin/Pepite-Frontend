import useCheckAuth from '@hooks/useCheckAuth';
import HomeComponent from '@views/Home/HomeComponent';

const HomeContainer = () => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  // Si le statut d'authentification est en cours de chargement, affichez un indicateur de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, ne rien rendre (ou rendre un composant spécifique)
  if (!isAuthenticated) {
    return null;
  }

  return <HomeComponent />;
};

export default HomeContainer;
