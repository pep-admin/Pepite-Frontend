import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

// Import des icônes
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ModalPosterContent2 = ({ infos, from, setShowUserInfos}) => {

  const [showMovieInfos, setShowMovieInfos] = useState(false);

  return (
    <Stack
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      bgcolor={!showMovieInfos ? 'rgba(0, 0, 0, 0.67)' : 'rgba(0, 0, 0, 0.85)'}
      padding="6px 20px"
      alignItems="center"
      sx={{
        overflowY: 'scroll',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        color="#fff"
        fontSize="3em"
        fontFamily="League Spartan"
        fontWeight={800}
        sx={{
          letterSpacing: '-3.5px',
          visibility:
            infos.is_gold_nugget === 1 || from === 'suggested'
              ? 'visible'
              : 'hidden',
        }}
      >
        {'pépite.'}
      </Typography>
      <Stack
        width="100%"
        flexGrow="1"
        alignItems="center"
        padding="10px 0"
        justifyContent="flex-start"
      >
        <VisibilityOffIcon
          fontSize="large"
          sx={{
            color: '#fff',
            marginBottom: '10px',
            cursor: 'pointer',
            order: '1',
          }}
          onClick={() => setShowUserInfos(false)}
        />
      </Stack>
    </Stack>
  
  );
};

export default ModalPosterContent2;