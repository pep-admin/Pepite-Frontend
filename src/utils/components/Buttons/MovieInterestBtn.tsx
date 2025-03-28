import { Fab, Stack, Typography } from '@mui/material';
import GoldNuggetIcon from '../GoldNuggetIcon';
import { TurnipIcon } from '../styledComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieInterestBtn = ({ btnFrom, btnType, value, disabled, handleBtn }) => {
  return (
    <Fab
      variant="extended"
      color="primary"
      sx={{
        height: btnFrom === 'rating' ? '50px' : '33px',
        width: btnFrom === 'rating' ? '50px' : 'auto',
        padding: '0 10px',
        background:
          btnType === 'gold'
            ? 'linear-gradient(320deg, rgba(33,22,6,1) 0%, rgba(117,76,16,1) 100%) !important'
            : btnType === 'turnip'
            ? 'linear-gradient(320deg, rgba(33,5,22,1) 0%, rgba(94,16,61,1) 100%) !important'
            : '#161616 !important',
        outline: '1px solid #151515',
        filter: disabled ? 'grayscale(1)' : 'none',
      }}
      onClick={() => handleBtn(btnType)}
    >
      <Stack
        spacing={1}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        height="100%"
        // width='100%'
      >
        {btnType === 'gold' ? (
          <GoldNuggetIcon
            height="100%"
            width={btnFrom === 'rating' ? '31px' : '20px'}
            isShadowed={false}
            strokeWidth="3px"
            sx={null}
          />
        ) : btnType === 'heart' ? (
          <FavoriteIcon
            sx={{
              color: 'red',
              fontSize: '20px',
            }}
          />
        ) : (
          <TurnipIcon
            sx={{
              height: '100%',
              width: btnFrom === 'rating' ? '30px' : '20px',
              position: 'relative',
              bottom: '1px',
              left: btnFrom === 'rating' ? '2px' : '0',
            }}
          />
        )}
        {btnFrom === 'movie' && (
          <Typography
            component="span"
            color={
              btnType === 'gold'
                ? 'secondary'
                : btnType === 'turnip'
                ? 'purple.light'
                : '#cf1c1c'
            }
            fontFamily="Pragati Narrow, sans-serif"
            fontSize="1.3em"
            fontWeight="600"
            lineHeight="1"
          >
            {`${value}`}
          </Typography>
        )}
      </Stack>
    </Fab>
  );
};

export default MovieInterestBtn;
