// Import des libs externes
import { Input, Snackbar, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Item } from '@utils/components/styledComponent';

// Import des composants internes
import ProfilRank2 from '@views/Profil/ProfilRank';

// Import des icônes
import DoneIcon from '@mui/icons-material/Done';

// Import des fonctions utilitaires
import { convertDate } from '@utils/functions/convertDate';

// Import des requêtes
import { modifyUserName } from '@utils/request/users/modifyUsername';

const AccountPersonalInfos = () => {
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const [handleFirstName, setHandleFirstName] = useState({
    modify: false,
    value: loggedUserInfos.first_name,
  });
  const [handleLastName, setHandleLastName] = useState({
    modify: false,
    value: loggedUserInfos.last_name,
  });
  const [showFirstValidate, setShowFirstValidate] = useState(false);
  const [showLastValidate, setShowLastValidate] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = message => {
    setSnackbar({ open: true, message });
  };

  const submitNewName = async (nameType: string) => {
    try {
      await modifyUserName(
        nameType,
        handleFirstName.value,
        handleLastName.value,
      );
      const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

      if (nameType === 'first_name') {
        loggedUserInfos.first_name = handleFirstName.value;
        localStorage.setItem('user_infos', JSON.stringify(loggedUserInfos));
        setShowFirstValidate(false);
        setHandleFirstName({
          modify: false,
          value: loggedUserInfos.first_name,
        });
        openSnackbar('Prénom modifié avec succès !');
      } else if (nameType === 'last_name') {
        loggedUserInfos.last_name = handleLastName.value;
        localStorage.setItem('user_infos', JSON.stringify(loggedUserInfos));
        setShowLastValidate(false);
        setHandleLastName({ modify: false, value: loggedUserInfos.last_name });
        openSnackbar('Nom modifié avec succès !');
      }
    } catch (_) {
      console.log("impossible de modifier les informations de l'utilisateur");
    }
  };

  return (
    <Item>
      <Stack spacing={2} padding="10px">
        <Stack direction="row" columnGap="50px">
          <Stack>
            <Typography
              align="left"
              fontSize="1em"
              component="p"
              fontWeight="500"
              color="#0E6666"
            >
              {'Nom'}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              marginTop="5px"
              position="relative"
            >
              <Input
                value={handleLastName.value}
                onChange={e => {
                  setHandleLastName({
                    modify: handleLastName.modify,
                    value: e.target.value,
                  });
                  setShowLastValidate(true);
                }}
                sx={{
                  height: '25px',
                  width: '120px',
                  fontSize: '1em',
                  bgcolor: '#eeeeee',
                  padding: '0 0 0 7px',
                  '&:after': {
                    borderBottomColor: '#24A5A5',
                  },
                }}
              />
              {showLastValidate ? (
                <DoneIcon
                  sx={{
                    fontSize: '17px',
                    bgcolor: '#5AC164',
                    color: '#fff',
                    borderRadius: '5px',
                    marginLeft: '15px',
                    position: 'absolute',
                    right: '-30px',
                  }}
                  onClick={() => submitNewName('last_name')}
                />
              ) : null}
            </Stack>
          </Stack>
          <Stack>
            <Typography
              align="left"
              fontSize="1em"
              component="p"
              fontWeight="500"
              color="#0E6666"
            >
              {'Prénom'}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              marginTop="5px"
              position="relative"
            >
              <Input
                value={handleFirstName.value}
                onChange={e => {
                  setHandleFirstName({
                    modify: handleFirstName.modify,
                    value: e.target.value,
                  });
                  setShowFirstValidate(true);
                }}
                sx={{
                  height: '25px',
                  width: '120px',
                  fontSize: '1em',
                  bgcolor: '#eeeeee',
                  padding: '0 0 0 7px',
                  '&:after': {
                    borderBottomColor: '#24A5A5',
                  },
                }}
              />
              {showFirstValidate ? (
                <DoneIcon
                  sx={{
                    fontSize: '17px',
                    bgcolor: '#5AC164',
                    color: '#fff',
                    borderRadius: '5px',
                    marginLeft: '15px',
                    position: 'absolute',
                    right: '-30px',
                  }}
                  onClick={() => submitNewName('first_name')}
                />
              ) : null}
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            align="left"
            fontSize="1em"
            component="p"
            fontWeight="500"
            color="#0E6666"
          >
            {'Rang'}
          </Typography>
          <ProfilRank2 page={'account'} criticsNumber={0} />
        </Stack>
        <Stack direction="row">
          <Typography
            align="left"
            fontSize="1em"
            component="p"
            fontWeight="500"
            color="#0E6666"
            marginRight="5px"
          >
            {'Membre depuis le'}
          </Typography>
          <Typography color="#919191">
            {`${convertDate(loggedUserInfos.create_datetime)}`}
          </Typography>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Item>
  );
};

export default AccountPersonalInfos;
