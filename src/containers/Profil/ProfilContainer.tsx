import { checkAuth } from '@utils/functions/checkAuth';
import ProfilComponent from '@views/Profil/ProfilComponent';

const ProfilContainer = () => {
  // Redirection vers la page /login si utilisateur non authentifié
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {    
    return;
  } 

  return <ProfilComponent />;
};

export default ProfilContainer;
