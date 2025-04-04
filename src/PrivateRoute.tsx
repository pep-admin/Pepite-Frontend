import { Navigate } from 'react-router-dom';
import useCheckAuth from '@hooks/useCheckAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  if (isLoading) {
    return null; // Affichez un indicateur de chargement ou tout autre contenu approprié
  }
  console.log('authentifié ?', isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
