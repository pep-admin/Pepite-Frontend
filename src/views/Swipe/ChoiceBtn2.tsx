// Import des libs externes
import { Stack } from '@mui/material';
import React, { FC } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import { CustomButton } from './CustomBtn';

// Import des icônes
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface ErrorState {
  state: boolean | null;
  message: string | null;
}

interface ChoiceBtn2Props {
  choice: string;
  isActive: boolean;
  handleActions: (btnChoice: string) => void;
  error: ErrorState;
}

const ChoiceBtn2: FC<ChoiceBtn2Props> = React.memo(
  ({ choice, isActive, handleActions, error }) => {
    return (
      <>
        <Stack alignItems="center" justifyContent="center">
          <CustomButton
            variant="contained"
            btntype={'others'}
            choice={choice}
            isactive={isActive}
            errorstate={error.state}
            onClick={() => handleActions(choice)}
          >
            {choice === 'unwanted' ? (
              isActive ? (
                <DeleteForeverOutlinedIcon fontSize="large" />
              ) : (
                <DeleteOutlinedIcon fontSize="large" />
              )
            ) : choice === 'wanted' ? (
              isActive ? (
                <PlaylistAddCheckOutlinedIcon
                  sx={{ fontSize: '2.5em', position: 'relative', left: '1px' }}
                />
              ) : (
                <PlaylistAddOutlinedIcon
                  sx={{ fontSize: '2.5em', position: 'relative', left: '1px' }}
                />
              )
            ) : isActive ? (
              <VisibilityOutlinedIcon fontSize="large" />
            ) : (
              <VisibilityOffOutlinedIcon fontSize="large" />
            )}
          </CustomButton>
        </Stack>
      </>
    );
  },
);

ChoiceBtn2.propTypes = {
  choice: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleActions: PropTypes.func.isRequired,
  // error: PropTypes.object.isRequired
}

export default ChoiceBtn2;
