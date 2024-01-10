import useCheckAuth from '@hooks/useCheckAuth';
import ContactsComponent from '@views/Contacts/ContactsComponent';

const ContactContainer = () => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  // Si le statut d'authentification est en cours de chargement, affichez un indicateur de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, ne rien rendre (ou rendre un composant spécifique)
  if (!isAuthenticated) {
    return null;
  }

  return <ContactsComponent page={'contacts'} />;
};

export default ContactContainer;
