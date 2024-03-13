// Import des libs externes
import { useEffect, useState, useCallback, useRef } from 'react';
import { animated } from 'react-spring';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import Particles from '@utils/anims/Particles';

// Import des icônes
import DiamondTwoToneIcon from '@mui/icons-material/DiamondTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { removeDiamondCritic } from '@utils/request/critics/removeDiamondCritic';
import { addDiamondCritic } from '@utils/request/critics/addDiamondCritic';
import { getDiamondsCriticNumber } from '@utils/request/critics/getDiamondsCriticNumber';
import { checkDiamondCriticStatus } from '@utils/request/critics/checkDiamondCriticStatus';
import { useVerticalAnimation } from '@hooks/useVerticalAnimation';
import { addDiamondAdvice } from '@utils/request/advices/addDiamondAdvice';
import { removeDiamondAdvice } from '@utils/request/advices/removeDiamondAdvice';
import { checkDiamondAdviceStatus } from '@utils/request/advices/checkDiamondAdviceStatus';
import { getDiamondsAdviceNumber } from '@utils/request/advices/getDiamondsAdviceNumber';
import { getDiamondsCriticCommentNumber } from '@utils/request/comments/getDiamondCriticCommentNumber';
import { checkDiamondCriticCommentStatus } from '@utils/request/comments/checkDiamondCriticCommentStatus';
import { addDiamondCriticComment } from '@utils/request/comments/addDiamondCriticComment';
import { removeDiamondCriticComment } from '@utils/request/comments/removeDiamondCriticComment';

const GoldFooter = ({ from, infos }) => {
  const { displayType } = useData();

  const [goldInfo, setGoldInfo] = useState({
    goldsNumber: 0,
    hasBeenGold: false,
  });
  const [goldAnim, setGoldAnim] = useState(false);

  const initialYposition = useRef(0);

  const { style, toggleAnimation } = useVerticalAnimation(
    initialYposition.current,
  );

  const fetchGoldNumber = useCallback(async () => {
    let response;

    if ('critic_id' in infos) {
      if (from === 'comment') {
        response = await getDiamondsCriticCommentNumber(infos.id, displayType);
      } else {
        response = await getDiamondsCriticNumber(infos.critic_id, displayType);
      }
    } else if ('advice_id' in infos) {
      if (from === 'comment') {
      } else {
        response = await getDiamondsAdviceNumber(infos.advice_id, displayType);
      }
    }

    setGoldInfo(prev => ({
      ...prev,
      goldsNumber: response,
    }));
  }, [infos.critic_id, displayType]);

  const checkUserGoldStatus = async () => {
    let response;

    if ('critic_id' in infos) {
      if (from === 'comment') {
        response = await checkDiamondCriticCommentStatus(infos.id, displayType);
      } else {
        response = await checkDiamondCriticStatus(infos.critic_id, displayType);
      }
    } else if ('advice_id' in infos) {
      if (from === 'comment') {
      } else {
        response = await checkDiamondAdviceStatus(infos.advice_id, displayType);
      }
    }

    setGoldInfo(prev => ({
      ...prev,
      hasBeenGold: response,
    }));
  };

  const toggleGold = useCallback(async () => {
    const isGolden = !goldInfo.hasBeenGold;

    setGoldInfo(prev => ({
      ...prev,
      hasBeenGold: isGolden,
    }));

    let newPosition;

    if (isGolden) {
      newPosition = initialYposition.current - 21.61;
    } else {
      newPosition = initialYposition.current + 21.61;
    }

    initialYposition.current = newPosition;

    toggleAnimation(newPosition);

    if (isGolden) {
      setGoldAnim(true);

      if ('critic_id' in infos) {
        if (from === 'comment') {
          await addDiamondCriticComment(infos.id, displayType);
        } else {
          await addDiamondCritic(infos.critic_id, displayType);
        }
      } else if ('advice_id' in infos) {
        if (from === 'comment') {
        } else {
          await addDiamondAdvice(infos.advice_id, displayType);
        }
      }
    } else {
      setGoldAnim(false);

      if ('critic_id' in infos) {
        if (from === 'comment') {
          await removeDiamondCriticComment(infos.id, displayType);
        } else {
          await removeDiamondCritic(infos.critic_id, displayType);
        }
      } else if ('advice_id' in infos) {
        if (from === 'comment') {
        } else {
          await removeDiamondAdvice(infos.advice_id, displayType);
        }
      }
    }
  }, [goldInfo.hasBeenGold, infos.critic_id, displayType]);

  useEffect(() => {
    fetchGoldNumber();
    checkUserGoldStatus();
  }, []);

  const goldMinusOne = goldInfo.goldsNumber - 1;
  const gold = goldInfo.goldsNumber;
  const goldPlusOne = goldInfo.goldsNumber + 1;

  return (
    <Stack
      direction="row"
      height="100%"
      alignItems="center"
      columnGap="5px"
      overflow="hidden"
    >
      {goldAnim && <Particles from={'diamond'} />}
      <DiamondTwoToneIcon
        fontSize="small"
        sx={{
          position: 'relative',
          top: '1px',
          color: goldInfo.hasBeenGold ? '#F29E50' : 'inherit',
        }}
        className={goldAnim ? 'gold-anim' : ''}
        onClick={toggleGold}
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
              {goldMinusOne}
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {gold}
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {goldPlusOne}
            </Typography>
          </Stack>
        </animated.div>
      </Stack>
    </Stack>
  );
};

GoldFooter.propTypes = {
  from: PropTypes.string.isRequired,
  infos: PropTypes.object.isRequired,
};

export default GoldFooter;
