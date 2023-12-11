// Import des libs externes
import {
  Modal,
  Stack,
  Typography,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Input,
} from '@mui/material';
import { Item } from '@utils/styledComponent';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des variables d'environnements
import apiBaseUrl from '@utils/request/config';
import SearchBar from '@utils/SearchBar';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

// Import de la requête pour envoyer le fichier image
import { uploadProfilPic } from '@utils/request/uploads/uploadProfilPic';
import { getUser } from '@utils/request/users/getUser';

const AccountUpdateProfilPic = ({
  showProfilPicModal,
  setShowProfilPicModal,
  userInfos,
  setUserInfos,
}) => {
  const [alignment, setAlignment] = useState('picture');
  // const [onSuccess, setOnSuccess] = useState(null);
  // const [onError, setOnError] = useState(null);

  const handleFileChange = async event => {
    try {
      const newFile = event.target.files[0];

      await uploadProfilPic(newFile);

      const newData = await getUser(userInfos.id);
      console.log('nouvelles données', newData);
      setUserInfos(newData);

      // setOnSuccess(true);
      // setOnError(false);
    } catch (error) {
      console.log("erreur dans l'envoi du fichier", error);

      // setOnError(false);
      // setOnError(true);
    }
  };

  return (
    <Modal
      open={showProfilPicModal}
      onClose={() => setShowProfilPicModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Item customheight="auto" customwidth="80vw" margintop="0">
        <Stack
          direction="row"
          height="33px"
          alignItems="center"
          justifyContent="space-between"
          padding="0 5px 0 13px"
        >
          <Typography variant="body2" component="p" fontWeight="bold">
            {'Modifiez votre photo de profil depuis'}
          </Typography>
          <CloseIcon
            sx={{ fontSize: '20px' }}
            onClick={() => setShowProfilPicModal(false)}
          />
        </Stack>
        <Stack direction="row">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            aria-label="Platform"
            fullWidth
          >
            <ToggleButton
              value="picture"
              onClick={() => setAlignment('picture')}
            >
              {'Vos photos'}
            </ToggleButton>
            <ToggleButton value="poster" onClick={() => setAlignment('poster')}>
              {'Un film / une série'}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack direction="column" alignItems="center" margin="12px 0">
          <Avatar
            alt={`Photo de profil de ${userInfos.first_name}`}
            src={`${apiBaseUrl}/uploads/${userInfos.profil_pic}`}
            sx={{
              width: 125,
              height: 125,
              cursor: 'pointer',
            }}
          />
          {alignment === 'picture' ? (
            <Stack direction="column" alignItems="center" margin="12px 0">
              <Typography marginBottom="10px">
                {'Depuis votre bibliothèque personnelle'}
              </Typography>
              <label htmlFor="file-input">
                <Input
                  id="file-input"
                  type="file"
                  style={{ display: 'none' }} // Masquer le champ d'entrée réel
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: '30px',
                    width: '175px',
                    padding: '0',
                    fontSize: '1em',
                    textTransform: 'initial',
                  }}
                  component="span"
                >
                  {'Importer une photo'}
                </Button>
              </label>
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center" margin="12px 0">
              <Typography marginBottom="10px">
                {'Depuis une recherche de film / série'}
              </Typography>
              <SearchBar Item={Item} page={'params'} />
            </Stack>
          )}
        </Stack>
      </Item>
    </Modal>
  );
};

AccountUpdateProfilPic.propTypes = {
  showProfilPicModal: PropTypes.bool.isRequired,
  setShowProfilPicModal: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
  setUserInfos: PropTypes.func.isRequired,
};

export default AccountUpdateProfilPic;
