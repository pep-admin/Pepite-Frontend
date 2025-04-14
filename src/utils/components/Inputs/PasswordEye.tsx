import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordEye = ({ formik, name, label = "Mot de passe", isSubmitted = false, autoComplete }) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth error={isSubmitted && Boolean(formik.errors[name])}>
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        {...formik.getFieldProps(name)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff sx={{ color: '#515151' }} /> : <Visibility sx={{ color: '#515151' }} />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        autoComplete={autoComplete}
        sx={{
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #c5c5c5',
          },
        }}
      />
      {isSubmitted && formik.errors[name] && (
        <FormHelperText
          sx={{
            position: 'absolute',
            bottom: '-22px',
            color: 'red',
          }}
        >
          {formik.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordEye;