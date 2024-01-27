import useCheckAuth from '@hooks/useCheckAuth';
import HomeComponent from '@views/Home/HomeComponent';

const HomeContainer = () => {
  const { isAuthenticated } = useCheckAuth();

  // Si l'utilisateur n'est pas authentifié, ne rien rendre
  if (!isAuthenticated) {
    return null;
  }

  return <HomeComponent />;
};

export default HomeContainer;
