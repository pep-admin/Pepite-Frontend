// Import des libs externes
import { Modal, Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

// Import des composants internes
import UserAvatar from '@utils/components/UserAvatar';

// Import des icônes
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CloseIcon from '@mui/icons-material/Close';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { OrangeRating } from '@utils/components/styledComponent';
import { formatRating } from '@utils/functions/formatRating';

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
  // const navigate = useNavigate();

  // Utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

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
          {!isModify && (
            <UserAvatar
              variant={'circular'}
              userInfos={
                type === 'new-critic' || type === 'new-advice'
                  ? loggedUserInfos
                  : criticUserInfos?.id &&
                    criticUserInfos?.id !== loggedUserInfos.id
                  ? criticUserInfos
                  : loggedUserInfos
              }
              picWidth={100}
              picHeight={100}
              isOutlined={false}
              outlineWidth={null}
              relationType={null}
              sx={{ order: '1' }}
            />
          )}

          <Box
            height="30px"
            width="30px"
            position="absolute"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#e1e1e1',
              borderRadius: '7px',
            }}
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
              type === 'new-critic' || type === 'new-advice' || isModify
                ? '10px'
                : 0
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
          {!isModify ? <Divider sx={{ margin: '12px 0' }} /> : null}
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
                  fontWeight="600"
                  fontStyle="italic"
                >
                  {`- ${criticUserInfos.first_name} ${criticUserInfos.last_name} -`}
                </Typography>
              </Typography>
            )}
          </Stack>
        </Box>
        {!isModify && (
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
        )}
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
