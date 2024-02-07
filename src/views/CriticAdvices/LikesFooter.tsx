import React, { useEffect, useState, useCallback, useRef } from 'react';
import { animated } from 'react-spring';
import { Stack, Typography } from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import PropTypes from 'prop-types';

import { useData } from '@hooks/DataContext';
import { removeLike } from '@utils/request/critics/removeLike';
import { addLike } from '@utils/request/critics/addLike';
import { getLikesNumber } from '@utils/request/critics/getLikesNumber';
import { checkLikeStatus } from '@utils/request/critics/checkLikesStatus';
import { useVerticalAnimation } from '@hooks/useVerticalAnimation';
import Particles from '@utils/anims/Particles';

const LikesFooter = ({ infos }) => {
  const { displayType } = useData();

  const [likeInfo, setLikeInfo] = useState({ likesNumber: 0, hasLiked: false });
  const [likeAnim, setLikeAnim] = useState(false);

  const initialYposition = useRef(0);

  const { style, toggleAnimation } = useVerticalAnimation(
    initialYposition.current,
  );

  const fetchLikesNumber = useCallback(async () => {
    const response = await getLikesNumber(infos.critic_id, displayType);

    setLikeInfo(prev => ({
      ...prev,
      likesNumber: response,
    }));
  }, [infos.critic_id, displayType]);

  const checkUserLikeStatus = async () => {
    const response = await checkLikeStatus(infos.critic_id, displayType);

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
      await addLike(infos.critic_id, displayType);
    } else {
      setLikeAnim(false);
      await removeLike(infos.critic_id, displayType);
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
