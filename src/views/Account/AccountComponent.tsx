// Import des libs externes
import { Container, Stack, Typography, Box } from '@mui/material';
import { useState } from 'react';

// Import des composants internes
import Header from '@utils/components/Header';
import UserAvatar from '@utils/components/UserAvatar';
import AccountPersonalInfos from './AccountPersonalInfos';
import AccountSecuritySettings from './AccountSecuritySettings';
import AccountUpdatePassword from './AccountUpdatePassword';
import AccountUpdatePic from './AccountUpdatePic';
import AccountDisplaySettings from './AccountDisplaySettings';

// Import des icônes
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Import des variables d'environnement
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

const AccountComponent = () => {
  const [loggedUserInfos, setLoggedUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  ); // Les infos de l'utilisateur connecté
  const [showPicModal, setShowPicModal] = useState({
    state: false,
    type: null,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <Header page={'account'} />
      {showPicModal.state && (
        <AccountUpdatePic
          showPicModal={showPicModal}
          setShowPicModal={setShowPicModal}
          loggedUserInfos={loggedUserInfos}
          setLoggedUserInfos={setLoggedUserInfos}
        />
      )}
      {showPasswordModal && (
        <AccountUpdatePassword
          showPasswordModal={showPasswordModal}
          setShowPasswordModal={setShowPasswordModal}
          loggedUserInfos={loggedUserInfos}
        />
      )}
      <Container
        sx={{
          bgcolor: '#CAE6E4',
          minHeight: '100vh',
          height: 'auto',
          padding: '0 0 20px 0',
        }}
      >
        <Stack direction="column">
          <Stack position="relative">
            <Box
              height="40vh"
              width="100vw"
              justifyContent="flex-end"
              sx={{
                backgroundImage: loggedUserInfos.coverPics.length
                  ? `url("${apiBaseUrl}/uploads/${
                      loggedUserInfos.coverPics.find(pic => pic.isActive === 1)
                        .filePath
                    }")`
                  : `url("${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: "url('/images/rounded_mask.svg')",
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'center center',
              }}
            ></Box>
            <Stack
              alignItems="center"
              width="100vw"
              position="absolute"
              bottom="-45px"
              zIndex="2"
            >
              <Stack
                direction="row"
                alignItems="center"
                columnGap="9vw"
                position="relative"
              >
                <UserAvatar
                  variant={'circular'}
                  userInfos={loggedUserInfos}
                  picWidth={120}
                  picHeight={120}
                  isOutlined={true}
                  outlineWidth={'5px'}
                  relationType={'default'}
                  sx={{
                    boxShadow: '0px 8px 5px 0px rgb(57 57 57 / 14%)',
                  }}
                  redirection={false}
                />
                <Box
                  height="40px"
                  width="40px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="50%"
                  position="absolute"
                  right="-14px"
                  top="0"
                  sx={{
                    background:
                      'linear-gradient(315deg, rgba(14,102,102,1) 17%, rgba(107,218,218,1) 100%)',
                    outline: '2px solid #FDFDFD',
                  }}
                  onClick={() =>
                    setShowPicModal({ state: true, type: 'profil' })
                  }
                >
                  <ModeEditIcon sx={{ color: '#FDFDFD' }} />
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems="center" marginTop="52px">
            <Typography
              component="h2"
              fontWeight="600"
              color="#383838"
              fontSize="4vh"
              letterSpacing="-1px"
              lineHeight="1"
              margin="7px 0 4px 0"
            >
              {'Votre compte'}
            </Typography>
          </Stack>
          <Stack padding="0 4%">
            <Stack marginTop="20px">
              <Typography
                component="h4"
                variant="body1"
                fontWeight="600"
                color="#383838"
                marginBottom="7px"
              >
                {'Informations personnelles'}
              </Typography>
              <AccountPersonalInfos />
            </Stack>
            <Stack marginTop="20px">
              <Typography
                component="h4"
                variant="body1"
                fontWeight="600"
                color="#383838"
                marginBottom="7px"
              >
                {"Paramètres d'affichage"}
              </Typography>
              <AccountDisplaySettings />
            </Stack>
            <Stack marginTop="20px">
              <Typography
                component="h4"
                variant="body1"
                fontWeight="600"
                color="#383838"
                marginBottom="7px"
              >
                {'Confidentialité & sécurité'}
              </Typography>
              <AccountSecuritySettings
                setShowPasswordModal={setShowPasswordModal}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default AccountComponent;
