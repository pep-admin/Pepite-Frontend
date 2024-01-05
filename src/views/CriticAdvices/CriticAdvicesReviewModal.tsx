// Import des libs externes
import { Modal, Stack, Box, Avatar, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des icônes
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CloseIcon from '@mui/icons-material/Close';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { OrangeRating } from '@utils/styledComponent';
import { formatRating } from '@utils/functions/formatRating';

// Import des variables d'environnements
import apiBaseUrl from '@utils/request/config';

const CriticAdvicesReviewModal = ({
  showReviewModal,
  setShowReviewModal,
  infos,
  type,
  isModify,
  customTextarea,
  newRating,
  criticUserInfos,
}) => {
  const { displayType, chosenMovie } = useData();
  const navigate = useNavigate();

  return (
    <Modal
      open={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        position="relative"
        marginBottom="0"
        sx={{
          outline: 'none',
        }}
      >
        <Stack direction="row">
          <Avatar
            variant="square"
            alt={`Photo de profil de ${criticUserInfos.first_name} ${criticUserInfos.last_name}`}
            src={
              // Si l'utilisateur qui a posté la critique || le conseil a défini une photo de profil
              criticUserInfos.profilPics.length
                ? `${apiBaseUrl}/uploads/${
                    criticUserInfos.profilPics.find(pic => pic.isActive === 1)
                      .filePath
                  }`
                : // Si l'utilisateur qui a posté la critique || le conseil n'a pas défini de photo de profil
                  'http://127.0.0.1:5173/images/default_profil_pic.png'
            }
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              order: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/profil/${criticUserInfos.id}`)}
          />
          <Box
            height="30px"
            width="30px"
            position="absolute"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#e1e1e1' }}
            onClick={() => setShowReviewModal(false)}
          >
            <CloseIcon />
          </Box>
        </Stack>
        <Box
          padding="20px 20px 15px 20px"
          display="flex"
          flexDirection="column"
          width="85vw"
          height={
            type === 'new-critic' || type === 'new-advice' || isModify
              ? '80vh'
              : 'auto'
          }
          maxHeight="80vh"
          overflow="scroll"
          order="3"
          sx={{
            backgroundColor: '#F1F1F1',
            borderRadius: '20px',
          }}
        >
          <Stack
            direction="column"
            marginBottom={
              type === 'new-critic' || type === 'new-advice' ? '10px' : 0
            }
            rowGap="3px"
          >
            <Typography
              variant="body1"
              component="h5"
              color="primary.dark"
              fontWeight="bold"
            >
              {displayType === 'movie' &&
              (type === 'old-critic' || type === 'old-advice')
                ? infos.title
                : displayType === 'tv' &&
                  (type === 'old-critic' || type === 'old-advice')
                ? infos.name
                : displayType === 'movie' &&
                  (type === 'new-critic' || type === 'new-advice') &&
                  chosenMovie
                ? chosenMovie.title
                : displayType === 'tv' &&
                  (type === 'new-critic' || type === 'new-advice') &&
                  chosenMovie
                ? chosenMovie.name
                : null}
            </Typography>
            <Stack direction="row" columnGap="10px">
              <OrangeRating
                precision={0.5}
                value={
                  type === 'old-critic' || type === 'old-advice'
                    ? parseFloat(infos.rating)
                    : parseFloat(newRating)
                }
                readOnly
              />
              <Typography variant="body2" component="p" fontWeight="bold">
                {type === 'old-critic' || type === 'old-advice'
                  ? `${formatRating(infos.rating)} / 5`
                  : !newRating
                  ? '0 / 5'
                  : `${newRating} / 5`}
              </Typography>
            </Stack>
          </Stack>
          {type === 'old-critic' || type === 'old-advice' ? (
            <Divider sx={{ margin: '12px 0' }} />
          ) : null}
          <Stack direction="column" flexGrow="1">
            {type === 'new-critic' || type === 'new-advice' || isModify ? (
              customTextarea('big')
            ) : (
              <Typography component="blockquote" textAlign="left">
                <Typography
                  component="p"
                  lineHeight="23px"
                  fontSize="1em"
                  marginBottom="10px"
                  whiteSpace="pre-wrap"
                >
                  {`${infos.text}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="cite"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {`- ${criticUserInfos.first_name} ${criticUserInfos.last_name} -`}
                </Typography>
              </Typography>
            )}
          </Stack>
        </Box>
        <Box
          height="35px"
          width="35px"
          position="absolute"
          top="80px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          order="2"
          zIndex="10"
          sx={{
            backgroundColor: '#24A5A5',
            boxShadow:
              '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
          }}
        >
          <FormatQuoteIcon sx={{ color: '#fff', fontSize: '1.8em' }} />
        </Box>
      </Stack>
    </Modal>
  );
};

CriticAdvicesReviewModal.propTypes = {
  type: PropTypes.string.isRequired,
  showReviewModal: PropTypes.bool.isRequired,
  setShowReviewModal: PropTypes.func.isRequired,
  infos: PropTypes.object,
  isModify: PropTypes.bool.isRequired,
  newRating: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  customTextarea: PropTypes.func.isRequired,
  criticUserInfos: PropTypes.object.isRequired,
};

export default CriticAdvicesReviewModal;
