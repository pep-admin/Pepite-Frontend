import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserRequest } from '@utils/request/users/getUserRequest';
import ProfilComponent2 from '@views/Profil/ProfilComponent2';
import { countUserAdditionalInfosRequest } from '@utils/request/users/countUserAdditionalInfosRequest';
import { Box, CircularProgress, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';

const ProfilContainer = () => {
  console.log('profil container');

  const { id } = useParams();

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const isProfilLoggedUser = loggedUserInfos.id === parseInt(id, 10);

  const [profilUser, setProfilUser] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [additionalInfos, setAdditionalInfos] = useState({
    criticsNumber: null,
    goldsNumber: null,
    turnipNumber: null,
  }); // Le nombre de critiques de l'utilisateur du profil
  // const [error, setError] = useState({ status: null, message: '' });

  const getUser = async () => {
    try {
      setIsUserLoading(true);

      if (isProfilLoggedUser) {
        setProfilUser(loggedUserInfos);
        console.log('utilisateur =>', loggedUserInfos);
      } else {
        const user = await getUserRequest(id);
        setProfilUser(user);
        console.log('utilisateur =>', user);
      }
    } catch (error) {
      console.log('erreur lors de la récupération des données user');

      // setError({
      //   status: true,
      //   message: "Impossible de récupérer les données de l'utilisateur.",
      // });
    } finally {
      setIsUserLoading(false);
    }
  };

  // Compte le nombre de critiques et le nombre de pépites de l'utilisateur
  useEffect(() => {
    const fetchCounts = async () => {
      const { criticsNumber, goldsNumber } =
        await countUserAdditionalInfosRequest(id);
      setAdditionalInfos({
        criticsNumber: criticsNumber,
        goldsNumber: goldsNumber,
        turnipNumber: null,
      });
    };

    fetchCounts();
  }, [id]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box height="auto" minHeight="100vh" width="100vw" bgcolor="#011212">
      <Header2 page={'Mon profil'} isTrailerFullscreen={null} />
      {!isUserLoading ? (
        <ProfilComponent2
          isProfilLoggedUser={isProfilLoggedUser}
          userInfos={profilUser}
          additionalInfos={additionalInfos}
        />
      ) : (
        <Stack
          height="calc(100vh - 56px)"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress
            color="secondary"
            sx={{ height: '15vw', width: '15vw' }}
          />
        </Stack>
      )}
    </Box>
  );
};

export default ProfilContainer;
