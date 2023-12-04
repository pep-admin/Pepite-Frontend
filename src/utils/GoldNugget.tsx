import { Box } from '@mui/material';
import { GoldNuggetIcon } from './styledComponent';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';

const useTranslateAnimation = setIsNuggetAnimEnded =>
  useSpring({
    from: { opacity: 0, transform: 'translateX(-50vw)' },
    to: [
      { opacity: 1, transform: 'translateX(0vw)' },
      { opacity: 1, transform: 'translateX(0vw)', delay: 1000 },
      { opacity: 0, transform: 'translateX(50vw)' },
    ],
    onRest: () => setIsNuggetAnimEnded(true),
  });

const useShineAnimation = () =>
  useSpring({
    from: { transform: 'skewX(50deg) translate(-51px, 12px)' },
    to: { transform: 'skewX(50deg) translate(145px, -54px)' },
    delay: 800,
    config: { duration: 450 },
  });

const GoldNugget = ({ setIsNuggetAnimEnded }) => {
  const AnimatedBox = animated(Box);

  const translate = useTranslateAnimation(setIsNuggetAnimEnded);
  const shine = useShineAnimation();

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      width="100vw"
      height="100vh"
      margin="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex="1301"
      sx={{
        pointerEvents: 'none',
      }}
    >
      <AnimatedBox
        width="122px"
        height="123px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={translate}
        overflow="hidden"
        sx={{
          clipPath:
            'polygon(76% 22%, 84% 40%, 72% 73%, 64% 80%, 47% 82%, 32% 81%, 20% 75%, 15% 66%, 16% 50%, 23% 37%, 44% 19%, 62% 18%)',
        }}
      >
        <GoldNuggetIcon
          sx={{
            fontSize: '6em',
            position: 'relative',
            top: '1px',
            right: '1px',
          }}
        />
        <AnimatedBox
          style={shine}
          position="absolute"
          top="0"
          left="0"
          height="100%"
          width="35px"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            pointerEvents: 'none',
          }}
        ></AnimatedBox>
      </AnimatedBox>
    </Box>
  );
};

GoldNugget.propTypes = {
  setIsNuggetAnimEnded: PropTypes.func.isRequired,
};

export default GoldNugget;
