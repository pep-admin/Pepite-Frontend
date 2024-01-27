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
  Card,
  CardMedia,
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
import { uploadUserPic } from '@utils/request/uploads/uploadUserPic';
import { getUser } from '@utils/request/users/getUser';
import CustomAlert from '@utils/CustomAlert';
import { recoverOldPic } from '@utils/request/uploads/recoverOldPic';
import { uploadPoster } from '@utils/request/uploads/uploadPoster';

const AccountUpdatePic = ({
  showPicModal,
  setShowPicModal,
  userInfos,
  setUserInfos,
}) => {
  const [alignment, setAlignment] = useState('picture'); // Téléchargement par photo ou recherche de poster
  const [onSuccess, setOnSuccess] = useState({ state: null, message: null });

  // Ajout d'une nouvelle photo de profil / de couverture depuis la bibliothèque personnelle de l'utilisateur
  const handleFileChange = async (event, picType) => {
    try {
      const newFile = event.target.files[0];

      await uploadUserPic(newFile, picType);

      const newData = await getUser(userInfos.id);
      console.log(newData);

      setUserInfos(newData);
      setOnSuccess({
        state: true,
        message: `Photo de ${picType} ajoutée avec succès !`,
      });
    } catch (error) {
      setOnSuccess({ state: false, message: error.response.data.message });
    }
  };

  // Revenir à une ancienne photo de profil / de couverture
  const handleOldPic = async (imgId, picType) => {
    try {
      await recoverOldPic(imgId, picType);
      const newData = await getUser(userInfos.id);
      setUserInfos(newData);

      setOnSuccess({
        state: true,
        message: `Ancienne photo de ${picType} réactivée`,
      });
    } catch (error) {
      setOnSuccess({
        state: false,
        message: `Erreur dans la modification de la photo de ${picType}`,
      });
    }
  };

  // Ajout d'une nouvelle photo de profil / couverture depuis une recherche de poster
  const handlePoster = async (posterPath, picType) => {
    try {
      await uploadPoster(posterPath, picType);
      const newData = await getUser(userInfos.id);
      setUserInfos(newData);

      setOnSuccess({
        state: true,
        message: 'Photo de profil ajoutée avec succès !',
      });
    } catch (error) {
      setOnSuccess({
        state: false,
        message: error.response.data.message,
      });
    }
  };

  return (
    <Modal
      open={showPicModal.state}
      onClose={() => setShowPicModal(false)}
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
            alertType={'success'}
            message={onSuccess.message}
            setOnAlert={setOnSuccess}
          />
        ) : onSuccess.state === false ? (
          <CustomAlert
            alertType={'error'}
            message={onSuccess.message}
            setOnAlert={setOnSuccess}
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
            {showPicModal.type === 'profil'
              ? 'Modifiez votre photo de profil depuis'
              : 'Modifiez votre photo de couverture depuis'}
          </Typography>
          <CloseIcon
            sx={{ fontSize: '20px' }}
            onClick={() => setShowPicModal({ state: false, type: null })}
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
          {showPicModal.type === 'profil' ? (
            <Avatar
              alt={`Photo de profil de ${userInfos.first_name}`}
              src={
                !userInfos.profilPics.length
                  ? 'http://127.0.0.1:5173/images/default_profil_pic.png'
                  : `${apiBaseUrl}/uploads/${
                      userInfos.profilPics.find(pic => pic.isActive === 1)
                        .filePath
                    }`
              }
              sx={{
                width: 125,
                height: 125,
                cursor: 'pointer',
              }}
            />
          ) : (
            <Card
              sx={{
                height: '140px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '12px 0',
                boxShadow: 'none',
              }}
            >
              <CardMedia
                image={
                  !userInfos.coverPics.length
                    ? 'http://127.0.0.1:5173/images/default_cover_pic_pietro_jeng.jpg'
                    : `${apiBaseUrl}/uploads/${
                        userInfos.coverPics.find(pic => pic.isActive === 1)
                          .filePath
                      }`
                }
                sx={{
                  height: '100%',
                  width: '75%',
                  borderRadius: '5px',
                }}
              />
            </Card>
          )}
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
                  onChange={e => handleFileChange(e, showPicModal.type)}
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
              {showPicModal.type === 'profil' && userInfos.profilPics.length ? (
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
                  {userInfos.profilPics.map(pic => {
                    return (
                      <ImageListItem
                        key={pic.id}
                        onClick={() => handleOldPic(pic.id, 'profil')}
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
              ) : showPicModal.type === 'couverture' &&
                userInfos.coverPics.length ? (
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
                  {userInfos.coverPics.map(pic => {
                    return (
                      <ImageListItem
                        key={pic.id}
                        onClick={() => handleOldPic(pic.id, 'couverture')}
                      >
                        <img
                          src={`${apiBaseUrl}/uploads/${pic.filePath}`}
                          alt={`Photo de couverture de ${userInfos.first_name}`}
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
                showPicModal={showPicModal}
              />
            </Stack>
          )}
        </Stack>
      </Item>
    </Modal>
  );
};

AccountUpdatePic.propTypes = {
  showPicModal: PropTypes.object.isRequired,
  setShowPicModal: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
  setUserInfos: PropTypes.func.isRequired,
};

export default AccountUpdatePic;
