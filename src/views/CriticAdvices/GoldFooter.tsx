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
import { removeGold } from '@utils/request/goldNugget/removeGold';
import { addGold } from '@utils/request/goldNugget/addGold';
import { getGoldNumber } from '@utils/request/goldNugget/getGoldNumber';
import { checkGoldStatus } from '@utils/request/goldNugget/checkGoldStatus';
import { useVerticalAnimation } from '@hooks/useVerticalAnimation';

const GoldFooter = ({ infos }) => {
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
    const response = await getGoldNumber(infos.critic_id, displayType);

    setGoldInfo(prev => ({
      ...prev,
      goldsNumber: response,
    }));
  }, [infos.critic_id, displayType]);

  const checkUserGoldStatus = async () => {
    const response = await checkGoldStatus(infos.critic_id, displayType);

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
      await addGold(infos.critic_id, displayType);
    } else {
      setGoldAnim(false);
      await removeGold(infos.critic_id, displayType);
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
      {/* <Particles particles={particles} /> */}
      <animated.div style={{ transform: style.transform }}>
        <Stack width="10px">
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {goldMinusOne}
          </Typography>
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {gold}
          </Typography>
          <Typography component="p" fontSize="1em" fontWeight="bold">
            {goldPlusOne}
          </Typography>
        </Stack>
      </animated.div>
    </Stack>
  );
};

GoldFooter.propTypes = {
  infos: PropTypes.object.isRequired,
};

export default GoldFooter;
