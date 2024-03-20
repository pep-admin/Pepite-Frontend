// Import des libs externes
import { Stack, Typography } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';

// Import des composants internes
import Particles from '@utils/anims/Particles';

// Import des icônes
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import du hook personnalisé d'animation verticale pour l'affichage des chiffres
import { useVerticalAnimation } from '@hooks/useVerticalAnimation';

// Import des requêtes
import { removeLikeCritic } from '@utils/request/critics/removeLikeCritic';
import { addLikeCritic } from '@utils/request/critics/addLikeCritic';
import { getCriticLikesNumber } from '@utils/request/critics/getCriticLikesNumber';
import { checkLikeCriticStatus } from '@utils/request/critics/checkLikeCriticStatus';
import { addLikeAdvice } from '@utils/request/advices/addLikeAdvice';
import { checkLikeAdviceStatus } from '@utils/request/advices/checkLikeAdviceStatus';
import { getAdviceLikesNumber } from '@utils/request/advices/getAdviceLikesNumber';
import { removeLikeAdvice } from '@utils/request/advices/removeLikeAdvice';
import { addCriticCommentLike } from '@utils/request/comments/addCriticCommentLike';
import { addAdviceCommentLike } from '@utils/request/comments/addAdviceCommentLike';
import { removeCriticCommentLike } from '@utils/request/comments/removeCriticCommentLike';
import { removeAdviceCommentLike } from '@utils/request/comments/removeAdviceCommentLike';
import { checkCriticCommentLikeStatus } from '@utils/request/comments/checkCriticCommentLikeStatus';
import { checkAdviceCommentLikeStatus } from '@utils/request/comments/checkAdviceCommentLikeStatus';
import { getCommentsCriticLikesNumber } from '@utils/request/comments/getCommentsCriticLikesNumber';
import { getCommentsAdviceLikesNumber } from '@utils/request/comments/getCommentsAdviceLikesNumber';

const LikesFooter = ({ from, infos }) => {
  const { displayType } = useData();

  const [likeInfo, setLikeInfo] = useState({ likesNumber: 0, hasLiked: false });
  const [likeAnim, setLikeAnim] = useState(false);

  const initialYposition = useRef(0);

  const { style, toggleAnimation } = useVerticalAnimation(
    initialYposition.current,
  );

  const fetchLikesNumber = useCallback(async () => {
    let response;

    if ('critic_id' in infos) {
      if (from === 'comment') {
        response = await getCommentsCriticLikesNumber(infos.id, displayType);
      } else {
        response = await getCriticLikesNumber(infos.critic_id, displayType);
      }
    } else if ('advice_id' in infos) {
      if (from === 'comment') {
        response = await getCommentsAdviceLikesNumber(infos.id, displayType);
      } else {
        response = await getAdviceLikesNumber(infos.advice_id, displayType);
      }
    } else return;

    setLikeInfo(prev => ({
      ...prev,
      likesNumber: response,
    }));
  }, [infos.critic_id, displayType]);

  const checkUserLikeStatus = async () => {
    let response;

    if ('critic_id' in infos) {
      if (from === 'comment') {
        response = await checkCriticCommentLikeStatus(infos.id, displayType);
      } else {
        response = await checkLikeCriticStatus(infos.critic_id, displayType);
      }
    } else if ('advice_id' in infos) {
      if (from === 'comment') {
        response = await checkAdviceCommentLikeStatus(infos.id, displayType);
      } else {
        response = await checkLikeAdviceStatus(infos.advice_id, displayType);
      }
    } else return;

    setLikeInfo(prev => ({
      ...prev,
      hasLiked: response,
    }));
  };

  const toggleLike = useCallback(async () => {
    const isLiking = !likeInfo.hasLiked;
    setLikeInfo(prev => ({
      ...prev,
      hasLiked: isLiking,
    }));

    let newPosition;

    if (isLiking) {
      newPosition = initialYposition.current - 21.61;
    } else {
      newPosition = initialYposition.current + 21.61;
    }

    initialYposition.current = newPosition;

    toggleAnimation(newPosition);

    if (isLiking) {
      setLikeAnim(true);

      if ('critic_id' in infos) {
        if (from === 'comment') {
          await addCriticCommentLike(infos.id, displayType);
        } else {
          await addLikeCritic(infos.critic_id, displayType);
        }
      } else if ('advice_id' in infos) {
        if (from === 'comment') {
          await addAdviceCommentLike(infos.id, displayType);
        } else {
          await addLikeAdvice(infos.advice_id, displayType);
        }
      } else return;
    } else {
      setLikeAnim(false);

      if ('critic_id' in infos) {
        if (from === 'comment') {
          await removeCriticCommentLike(infos.id, displayType);
        } else {
          await removeLikeCritic(infos.critic_id, displayType);
        }
      } else if ('advice_id' in infos) {
        if (from === 'comment') {
          await removeAdviceCommentLike(infos.id, displayType);
        } else {
          await removeLikeAdvice(infos.advice_id, displayType);
        }
      } else return;
    }
  }, [likeInfo.hasLiked, infos.critic_id, displayType]);

  // Récupère le nombre initial de likes et vérifie le statut de like de l'utilisateur
  useEffect(() => {
    fetchLikesNumber();
    checkUserLikeStatus();
  }, []);

  const likesMinusOne = likeInfo.likesNumber - 1;
  const likes = likeInfo.likesNumber;
  const likesPlusOne = likeInfo.likesNumber + 1;

  return (
    <Stack
      direction="row"
      height="100%"
      alignItems="center"
      columnGap="5px"
      // overflow="hidden"
    >
      {likeAnim && <Particles from={'like'} />}
      <ThumbUpTwoToneIcon
        fontSize="small"
        color={likeInfo.hasLiked ? 'success' : 'inherit'}
        sx={{ position: 'relative', bottom: '1px', cursor: 'pointer' }}
        onClick={toggleLike}
        className={likeAnim ? 'like-anim' : ''}
      />
      <Stack
        width="10px"
        height="21.61px"
        justifyContent="center"
        overflow="hidden"
      >
        <animated.div style={{ transform: style.transform }}>
          <Stack width="10px">
            <Typography variant="body1" fontWeight="600">
              {likesMinusOne}
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {likes}
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {likesPlusOne}
            </Typography>
          </Stack>
        </animated.div>
      </Stack>
    </Stack>
  );
};

LikesFooter.propTypes = {
  from: PropTypes.string.isRequired,
  infos: PropTypes.object.isRequired,
};

export default LikesFooter;
