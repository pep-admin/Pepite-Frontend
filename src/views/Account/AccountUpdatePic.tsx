// Import des libs externes
import {
  Modal,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Input,
  ImageList,
  ImageListItem,
  Card,
  CardMedia,
  Snackbar,
} from '@mui/material';
import { Item } from '@utils/components/styledComponent';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import UserAvatar from '@utils/components/UserAvatar';
import SearchBar from '@utils/components/SearchBar';

// Import des variables d'environnements
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

// Import des requêtes
import { uploadUserPic } from '@utils/request/uploads/uploadUserPic';
import { getUser } from '@utils/request/users/getUser';
import { recoverOldPic } from '@utils/request/uploads/recoverOldPic';
import { uploadPoster } from '@utils/request/uploads/uploadPoster';

const AccountUpdatePic = ({
  showPicModal,
  setShowPicModal,
  loggedUserInfos,
  setLoggedUserInfos,
}) => {
  const [alignment, setAlignment] = useState('picture'); // Téléchargement par photo ou recherche de poster
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = message => {
    setSnackbar({ open: true, message });
  };

  // Ajout d'une nouvelle photo de profil / de couverture depuis la bibliothèque personnelle de l'utilisateur
  const handleFileChange = async (event, picType) => {
    try {
      const newFile = event.target.files[0];

      await uploadUserPic(newFile, picType);

      const newData = await getUser(loggedUserInfos.id);

      // Met à jour le localStorage
      localStorage.setItem('user_infos', JSON.stringify(newData));

      setLoggedUserInfos(newData);

      openSnackbar(`Photo de ${picType} ajoutée avec succès !`);
    } catch (error) {
      openSnackbar(`Impossible d'ajouter la photo de ${picType}.`);
    }
  };

  // Revenir à une ancienne photo de profil / de couverture
  const handleOldPic = async (imgId, picType) => {
    try {
      await recoverOldPic(imgId, picType);
      const newData = await getUser(loggedUserInfos.id);
      setLoggedUserInfos(newData);

      // Met à jour le localStorage
      localStorage.setItem('user_infos', JSON.stringify(newData));

      openSnackbar(`Ancienne photo de ${picType} réactivée !`);
    } catch (error) {
      openSnackbar(`Erreur dans la modification de la photo de ${picType}`);
    }
  };

  // Ajout d'une nouvelle photo de profil / couverture depuis une recherche de poster
  const handlePoster = async (posterPath, picType) => {
    try {
      await uploadPoster(posterPath, picType);
      const newData = await getUser(loggedUserInfos.id);
      setLoggedUserInfos(newData);

      // Met à jour le localStorage
      localStorage.setItem('user_infos', JSON.stringify(newData));

      openSnackbar('Photo de profil ajoutée avec succès !');
    } catch (error) {
      openSnackbar("Impossible d'ajouter la photo de profil.");
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
      <Item customheight="auto" customwidth="80vw" position="relative">
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
            <UserAvatar
              variant={'circular'}
              userInfos={loggedUserInfos}
              picWidth={125}
              picHeight={125}
              isOutlined={false}
              outlineWidth={null}
              relationType={null}
              sx={null}
              redirection={false}
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
                  !loggedUserInfos.coverPics.length
                    ? `${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg`
                    : `${apiBaseUrl}/uploads/${
                        loggedUserInfos.coverPics.find(
                          pic => pic.isActive === 1,
                        ).filePath
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
                    background:
                      'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)',
                    color: '#fff',
                  }}
                  component="span"
                >
                  {'Importer une photo'}
                </Button>
              </label>
              {showPicModal.type === 'profil' &&
              loggedUserInfos.profilPics.length ? (
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
                  {loggedUserInfos.profilPics.map(pic => {
                    return (
                      <ImageListItem
                        key={pic.id}
                        onClick={() => handleOldPic(pic.id, 'profil')}
                      >
                        <img
                          src={`${apiBaseUrl}/uploads/${pic.filePath}`}
                          alt={`Photo de profil de ${loggedUserInfos.first_name}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              ) : showPicModal.type === 'couverture' &&
                loggedUserInfos.coverPics.length ? (
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
                  {loggedUserInfos.coverPics.map(pic => {
                    return (
                      <ImageListItem
                        key={pic.id}
                        onClick={() => handleOldPic(pic.id, 'couverture')}
                      >
                        <img
                          src={`${apiBaseUrl}/uploads/${pic.filePath}`}
                          alt={`Photo de couverture de ${loggedUserInfos.first_name}`}
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
                page={'params'}
                loggedUserInfos={loggedUserInfos}
                handlePoster={handlePoster}
                showPicModal={showPicModal}
              />
            </Stack>
          )}
        </Stack>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Item>
    </Modal>
  );
};

AccountUpdatePic.propTypes = {
  showPicModal: PropTypes.object.isRequired,
  setShowPicModal: PropTypes.func.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
  setLoggedUserInfos: PropTypes.func.isRequired,
};

export default AccountUpdatePic;
