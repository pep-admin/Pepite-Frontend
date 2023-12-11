// Import des libs externes
import { Modal, Stack, Box, Avatar, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

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
  criticInfos,
  type,
  isModify,
  customTextarea,
  newRating,
}) => {
  const { displayType, chosenMovie } = useData();

  const userInfos = JSON.parse(localStorage.getItem('user_infos'));

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
            alt={`Photo de profil de ${userInfos.first_name}`}
            src={`${apiBaseUrl}/uploads/${userInfos.profil_pic}`}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              order: 1,
            }}
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
          height={type === 'new-critic' || isModify ? '80vh' : 'auto'}
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
            marginBottom={type === 'new-critic' ? '10px' : 0}
            rowGap="3px"
          >
            <Typography
              variant="body1"
              component="h5"
              color="primary.dark"
              fontWeight="bold"
            >
              {displayType === 'movie' && type === 'old-critic'
                ? criticInfos.title
                : displayType === 'tv' && type === 'old-critic'
                ? criticInfos.name
                : displayType === 'movie' &&
                  type === 'new-critic' &&
                  chosenMovie
                ? chosenMovie.title
                : displayType === 'tv' && type === 'new-critic' && chosenMovie
                ? chosenMovie.name
                : null}
            </Typography>
            <Stack direction="row" columnGap="10px">
              <OrangeRating
                precision={0.5}
                value={
                  type === 'old-critic'
                    ? parseFloat(criticInfos.rating)
                    : parseFloat(newRating)
                }
                readOnly
              />
              <Typography variant="body2" component="p" fontWeight="bold">
                {type === 'old-critic'
                  ? `${formatRating(criticInfos.rating)} / 5`
                  : !newRating
                  ? '0 / 5'
                  : `${newRating} / 5`}
              </Typography>
            </Stack>
          </Stack>
          {type === 'old-critic' ? <Divider sx={{ margin: '12px 0' }} /> : null}
          <Stack direction="column" flexGrow="1">
            {type === 'new-critic' || isModify ? (
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
                  {`${criticInfos.text}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="cite"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {`- ${userInfos.first_name} ${userInfos.last_name} -`}
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
  criticInfos: PropTypes.object,
  isModify: PropTypes.bool.isRequired,
  newRating: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  customTextarea: PropTypes.func.isRequired,
};

export default CriticAdvicesReviewModal;
