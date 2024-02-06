import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Stack, Typography } from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import PropTypes from 'prop-types';

import { useData } from '@hooks/DataContext';
import { removeLike } from '@utils/request/critics/removeLike';
import { addLike } from '@utils/request/critics/addLike';
import { getLikesNumber } from '@utils/request/critics/getLikesNumber';
import { checkLikeStatus } from '@utils/request/critics/checkLikesStatus';

const LikesFooter = ({ infos }) => {
  const { displayType } = useData();
  const [likeInfo, setLikeInfo] = useState({ likesNumber: 0, hasLiked: false });

  const initialYposition = useRef(0);

  const [style, animate] = useSpring(() => ({
    transform: `translateY(${initialYposition.current}px)`,
    config: config.gentle,
  }));

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
    console.log('ancienne position =>', initialYposition.current);

    if (isLiking) {
      newPosition = initialYposition.current - 21.61;
    } else {
      newPosition = initialYposition.current + 21.61;
    }

    initialYposition.current = newPosition;

    animate.start({
      transform: `translateY(${newPosition.toString()}px)`,
    });

    if (isLiking) {
      await addLike(infos.critic_id, displayType);
    } else {
      await removeLike(infos.critic_id, displayType);
    }
  }, [likeInfo.hasLiked, infos.critic_id, displayType, animate]);

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
      overflow="hidden"
    >
      <ThumbUpTwoToneIcon
        fontSize="small"
        color={likeInfo.hasLiked ? 'success' : 'inherit'}
        sx={{ position: 'relative', bottom: '1px', cursor: 'pointer' }}
        onClick={toggleLike}
      />
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
  );
};

LikesFooter.propTypes = {
  infos: PropTypes.object.isRequired,
};

export default React.memo(LikesFooter);
