import { useEffect, useState, useCallback, useRef } from 'react';
import { animated } from 'react-spring';
import { Stack, Typography } from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import PropTypes from 'prop-types';

import { useData } from '@hooks/DataContext';
import { removeLikeCritic } from '@utils/request/critics/removeLikeCritic';
import { addLikeCritic } from '@utils/request/critics/addLikeCritic';
import { getCriticLikesNumber } from '@utils/request/critics/getCriticLikesNumber';
import { checkLikeCriticStatus } from '@utils/request/critics/checkLikeCriticStatus';
import { useVerticalAnimation } from '@hooks/useVerticalAnimation';
import Particles from '@utils/anims/Particles';
import { addLikeAdvice } from '@utils/request/advices/addLikeAdvice';
import { checkLikeAdviceStatus } from '@utils/request/advices/checkLikeAdviceStatus';
import { getAdviceLikesNumber } from '@utils/request/advices/getAdviceLikesNumber';
import { removeLikeAdvice } from '@utils/request/advices/removeLikeAdvice';

const LikesFooter = ({ infos }) => {
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
      response = await getCriticLikesNumber(infos.critic_id, displayType);
    } else if ('advice_id' in infos) {
      response = await getAdviceLikesNumber(infos.advice_id, displayType);
    } else return;

    setLikeInfo(prev => ({
      ...prev,
      likesNumber: response,
    }));
  }, [infos.critic_id, displayType]);

  const checkUserLikeStatus = async () => {
    let response;

    if ('critic_id' in infos) {
      response = await checkLikeCriticStatus(infos.critic_id, displayType);
    } else if ('advice_id' in infos) {
      response = await checkLikeAdviceStatus(infos.advice_id, displayType);
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
        await addLikeCritic(infos.critic_id, displayType);
      } else if ('advice_id' in infos) {
        await addLikeAdvice(infos.advice_id, displayType);
      } else return;
    } else {
      setLikeAnim(false);

      if ('critic_id' in infos) {
        await removeLikeCritic(infos.critic_id, displayType);
      } else if ('advice_id' in infos) {
        await removeLikeAdvice(infos.advice_id, displayType);
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
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {likesMinusOne}
            </Typography>
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {likes}
            </Typography>
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {likesPlusOne}
            </Typography>
          </Stack>
        </animated.div>
      </Stack>
    </Stack>
  );
};

LikesFooter.propTypes = {
  infos: PropTypes.object.isRequired,
};

export default LikesFooter;
