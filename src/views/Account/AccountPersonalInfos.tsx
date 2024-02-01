// Import des libs externes
import {
  Stack,
  Typography,
  Avatar,
  Button,
  LinearProgress,
  Input,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

// Import de la fonction pour convertir le timestamp en date
import { convertDate } from '@utils/functions/convertDate';
import { modifyUserName } from '@utils/request/users/modifyUsername';

// Import des variables d'environnements
import apiBaseUrl from '@utils/request/config';
// import UserAvatar from '@utils/components/UserAvatar';

const AccountPersonalInfos = ({ setShowPicModal, loggedUserInfos }) => {
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
      } else if (nameType === 'last_name') {
        loggedUserInfos.last_name = handleLastName.value;
        localStorage.setItem('user_infos', JSON.stringify(loggedUserInfos));
        setShowLastValidate(false);
        setHandleLastName({ modify: false, value: loggedUserInfos.last_name });
      }
    } catch (_) {
      console.log("impossible de modifier les informations de l'utilisateur");
    }
  };

  return (
    <Stack direction="row" height="165px">
      <Stack
        direction="column"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        rowGap="5px"
        padding="6px 10px"
        flexBasis="25%"
      >
        {/* <UserAvatar
          variant={'circular'}
          userInfos={loggedUserInfos}
          picWidth={100}
          picHeight={100}
          isOutlined={false}
          outlineWidth={null}
          relationType={null}
          sx={null}
        /> */}
        <Avatar
          alt={`Photo de profil de ${loggedUserInfos.first_name}`}
          src={
            !loggedUserInfos.profilPics.length
              ? 'http://127.0.0.1:5173/images/default_profil_pic.png'
              : `${apiBaseUrl}/uploads/${
                  loggedUserInfos.profilPics.find(pic => pic.isActive === 1)
                    .filePath
                }`
          }
          sx={{
            width: 100,
            height: 100,
            cursor: 'pointer',
          }}
          onClick={() => setShowPicModal({ state: true, type: 'profil' })}
        />
        <Button
          variant="contained"
          sx={{
            height: '25px',
            width: '100%',
            padding: '0',
            fontSize: '0.8em',
            textTransform: 'initial',
          }}
          onClick={() => setShowPicModal({ state: true, type: 'profil' })}
        >
          {'Modifier'}
        </Button>
      </Stack>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
        padding="10px"
        flexBasis="75%"
      >
        <Stack direction="row" alignItems="center">
          <Typography
            fontSize="1em"
            component="p"
            fontWeight="bold"
            color="#094B4B"
            marginRight="7px"
          >
            {'Prénom : '}
          </Typography>
          {!handleFirstName.modify ? (
            <Typography component="span" fontSize="1em">
              {`${loggedUserInfos.first_name}`}
            </Typography>
          ) : (
            <Input
              autoFocus
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
                width: '100px',
                fontSize: '1em',
              }}
            />
          )}
          <EditIcon
            sx={{
              fontSize: '17px',
              color: !handleFirstName.modify ? '#b5b5b5' : '#5AC164',
              margin: '0 7px',
            }}
            onClick={() => {
              setHandleFirstName({
                modify: !handleFirstName.modify,
                value: handleFirstName.value,
              });
              if (showFirstValidate) {
                setShowFirstValidate(false);
              }
            }}
          />
          {showFirstValidate ? (
            <DoneIcon
              sx={{
                fontSize: '17px',
                bgcolor: '#5AC164',
                color: '#fff',
                borderRadius: '5px',
                marginLeft: '7px',
              }}
              onClick={() => submitNewName('first_name')}
            />
          ) : null}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography
            fontSize="1em"
            component="p"
            fontWeight="bold"
            color="#094B4B"
            marginRight="7px"
          >
            {'Nom : '}
          </Typography>
          {!handleLastName.modify ? (
            <Typography component="span" fontSize="1em">
              {`${loggedUserInfos.last_name}`}
            </Typography>
          ) : (
            <Input
              autoFocus
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
                width: '100px',
                fontSize: '1em',
              }}
            />
          )}
          <EditIcon
            sx={{
              fontSize: '17px',
              color: !handleLastName.modify ? '#b5b5b5' : '#5AC164',
              margin: '0 7px',
            }}
            onClick={() => {
              setHandleLastName({
                modify: !handleLastName.modify,
                value: handleLastName.value,
              });
              if (showLastValidate) {
                setShowLastValidate(false);
              }
            }}
          />
          {showLastValidate ? (
            <DoneIcon
              sx={{
                fontSize: '17px',
                bgcolor: '#5AC164',
                color: '#fff',
                borderRadius: '5px',
                marginLeft: '7px',
              }}
              onClick={() => submitNewName('last_name')}
            />
          ) : null}
        </Stack>
        <Typography
          fontSize="1em"
          component="p"
          fontWeight="bold"
          color="#094B4B"
          marginRight="7px"
        >
          {'Email : '}
          <Typography component="span" fontSize="1em">
            {`${loggedUserInfos.email}`}
          </Typography>
        </Typography>
        <Typography
          fontSize="1em"
          component="p"
          fontWeight="bold"
          color="#094B4B"
        >
          {'Rang : '}
          <Typography component="span" fontSize="1em">
            {`${loggedUserInfos.rank}`}
          </Typography>
        </Typography>
        <LinearProgress
          color="success"
          variant="determinate"
          value={30}
          sx={{
            width: '75%',
          }}
        />
        <Typography
          fontSize="1em"
          component="p"
          fontWeight="bold"
          color="#094B4B"
        >
          {'Membre depuis : '}
          <Typography fontSize="1em" component="span">
            {`${convertDate(loggedUserInfos.create_datetime)}`}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

AccountPersonalInfos.propTypes = {
  setShowPicModal: PropTypes.func.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
};

export default AccountPersonalInfos;
