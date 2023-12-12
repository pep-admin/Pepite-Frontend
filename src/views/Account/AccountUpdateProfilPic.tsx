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
  ImageList,
  ImageListItem,
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
import CustomAlert from '@utils/CustomAlert';
import { recoverOldPic } from '@utils/request/uploads/recoverOldPic';
import { uploadPoster } from '@utils/request/uploads/uploadPoster';

const AccountUpdateProfilPic = ({
  showProfilPicModal,
  setShowProfilPicModal,
  userInfos,
  setUserInfos,
}) => {
  const [alignment, setAlignment] = useState('picture');
  const [onSuccess, setOnSuccess] = useState({ state: null, message: null });

  const handleFileChange = async event => {
    try {
      const newFile = event.target.files[0];

      await uploadProfilPic(newFile);
      const newData = await getUser(userInfos.id);
      setUserInfos(newData);
      setOnSuccess({
        state: true,
        message: 'Photo de profil ajoutée avec succès !',
      });
    } catch (error) {
      setOnSuccess({ state: false, message: error.response.data.message });
    }
  };

  const handleOldPic = async imgId => {
    try {
      await recoverOldPic(imgId);
      const newData = await getUser(userInfos.id);
      setUserInfos(newData);

      setOnSuccess({
        state: true,
        message: 'Ancienne photo de profil réactivée',
      });
    } catch (error) {
      setOnSuccess({
        state: false,
        message: 'Erreur dans la modification de la photo de profil',
      });
    }
  };

  const handlePoster = async posterPath => {
    try {
      await uploadPoster(posterPath);
      const newData = await getUser(userInfos.id);
      setUserInfos(newData);

      setOnSuccess({
        state: true,
        message: 'Photo de profil ajoutée avec succès !',
      });
    } catch (error) {
      setOnSuccess({
        state: false,
        message: "Erreur dans l'ajout de la photo de profil",
      });
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
      <Item
        customheight="auto"
        customwidth="80vw"
        margintop="0"
        position="relative"
      >
        {onSuccess.state ? (
          <CustomAlert
            type={'success'}
            message={onSuccess.message}
            setOnSuccess={setOnSuccess}
          />
        ) : onSuccess.state === false ? (
          <CustomAlert
            type={'error'}
            message={onSuccess.message}
            setOnSuccess={setOnSuccess}
          />
        ) : null}
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
              sx={{
                borderRadius: '0',
              }}
            >
              {'Vos photos'}
            </ToggleButton>
            <ToggleButton
              value="poster"
              onClick={() => setAlignment('poster')}
              sx={{
                borderRadius: '0',
              }}
            >
              {'Un film / une série'}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack direction="column" alignItems="center" margin="12px 0 0 0">
          <Avatar
            alt={`Photo de profil de ${userInfos.first_name}`}
            src={
              !userInfos.profil_pics.length
                ? 'http://127.0.0.1:5173/images/default_profil_pic.png'
                : `${apiBaseUrl}/uploads/${
                    userInfos.profil_pics.find(pic => pic.isActive === 1)
                      .filePath
                  }`
            }
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
              <label htmlFor="file-input" style={{ marginBottom: '12px' }}>
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
              {userInfos.profil_pics.length ? (
                <ImageList
                  sx={{
                    width: '90%',
                    height: 'auto',
                    maxHeight: 250,
                    margin: '0',
                  }}
                  cols={3}
                  rowHeight={100}
                >
                  {userInfos.profil_pics.map(pic => {
                    return (
                      <ImageListItem
                        key={pic.id}
                        onClick={() => handleOldPic(pic.id)}
                      >
                        <img
                          src={`${apiBaseUrl}/uploads/${pic.filePath}`}
                          alt={`Photo de profil de ${userInfos.first_name}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              ) : null}
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center" margin="12px 0">
              <Typography marginBottom="10px">
                {'Depuis une recherche de film / série'}
              </Typography>
              <SearchBar
                Item={Item}
                page={'params'}
                handlePoster={handlePoster}
              />
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
