import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserRequest } from '@utils/request/users/getUserRequest';
import ProfilComponent2 from '@views/Profil/ProfilComponent2';
import { countUserAdditionalInfosRequest } from '@utils/request/users/countUserAdditionalInfosRequest';

const ProfilContainer = () => {

  console.log('profil container');
  
  const { id } = useParams();
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const [profilUser, setProfilUser] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [additionalInfos, setAdditionalInfos] = useState({ criticsNumber: null, goldsNumber: null, turnipNumber: null }); // Le nombre de critiques de l'utilisateur du profil
  const [error, setError] = useState({ status: null, message: '' });

  const getUser = async() => {
    try {
      setIsUserLoading(true);

      if(loggedUserInfos.id === parseInt(id, 10)) {
        setProfilUser(loggedUserInfos);
        console.log('utilisateur =>', loggedUserInfos);

      } else {
        const user = await getUserRequest(id);
        setProfilUser(user);
        console.log('utilisateur =>', user);
      }
      
    } catch (error) {
      setError({ status: true, message: 'Impossible de récupérer les données de l\'utilisateur.' })
      
    } finally {
      setIsUserLoading(false);
    }
  };

  // Compte le nombre de critiques et le nombre de pépites de l'utilisateur
  useEffect(() => {
    const fetchCounts = async () => {
      const { criticsNumber, goldsNumber } =
        await countUserAdditionalInfosRequest(id);
      setAdditionalInfos({ criticsNumber: criticsNumber, goldsNumber: goldsNumber, turnipNumber: null })
    };

    fetchCounts();
  }, [id]);

  useEffect(() => {
    getUser();
  }, []);

  return !isUserLoading && <ProfilComponent2 userInfos={profilUser} additionalInfos={additionalInfos} />;
};

export default ProfilContainer;
