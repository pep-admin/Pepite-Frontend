// Import des libs externes
import { Container, Stack, Typography, Divider } from '@mui/material';
import { useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import AccountPersonalInfos from './AccountPersonalInfos';
import AccountDisplaySettings from './AccountDisplaySettings';
import AccountSecuritySettings from './AccountSecuritySettings';
import AccountDelete from './AccountDelete';
import AccountFaq from './AccountFaq';
import AccountUpdateProfilPic from './AccountUpdateProfilPic';

const AccountComponent = () => {
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [showProfilPicModal, setShowProfilPicModal] = useState(false);

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        sx={{ minHeight: 'calc(100vh - 60px)', height: 'auto', padding: '6px' }}
      >
        {showProfilPicModal ? (
          <AccountUpdateProfilPic
            showProfilPicModal={showProfilPicModal}
            setShowProfilPicModal={setShowProfilPicModal}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        ) : null}
        <Stack direction="column" spacing={1} height="100%">
          <Item
            customheight="30px"
            display="flex"
            justifycontent="center"
            alignitems="center"
            margintop="0"
          >
            <Typography variant="body1" component="h2" fontWeight="bold">
              {'Votre compte'}
            </Typography>
          </Item>
          <Item>
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'À propos de vous'}
              </Typography>
            </Stack>
            <Divider />
            <AccountPersonalInfos
              setShowProfilPicModal={setShowProfilPicModal}
              userInfos={userInfos}
            />
          </Item>
          <Item>
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {"Paramètres d'affichage"}
              </Typography>
            </Stack>
            <Divider />
            <AccountDisplaySettings />
          </Item>
          <Item>
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'Confidentialité & sécurité'}
              </Typography>
            </Stack>
            <Divider />
            <AccountSecuritySettings />
          </Item>
          <Item>
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'FAQ'}
              </Typography>
            </Stack>
            <Divider />
            <AccountFaq />
          </Item>
          <Item>
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'Réinitialisation & suppression'}
              </Typography>
            </Stack>
            <Divider />
            <AccountDelete />
          </Item>
        </Stack>
      </Container>
    </>
  );
};

export default AccountComponent;
