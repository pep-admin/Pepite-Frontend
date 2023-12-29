// Import des libs externes
import {
  Modal,
  Stack,
  Button,
  Typography,
  Divider,
  FormControl,
  FormHelperText,
  Input,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import du composant customisé
import { Item } from '@utils/styledComponent';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';
import { updatePassword } from '@utils/request/users/updatePassword';
import CustomAlert from '@utils/CustomAlert';

const AccountUpdatePassword = ({
  showPasswordModal,
  setShowPasswordModal,
  userInfos,
}) => {
  const [onSuccess, setOnSuccess] = useState(null);

  const submitNewPassword = async (oldPassword, newPassword) => {
    try {
      await updatePassword(oldPassword, newPassword);
      setOnSuccess(true);
    } catch (error) {
      setOnSuccess(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Ancien mot de passe requis'),
      newPassword: Yup.string()
        .min(8, 'Doit contenir au moins 8 caractères')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
          'Au moins une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial',
        )
        .required('Nouveau mot de passe requis'),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('newPassword'), null],
          'Les mots de passe doivent correspondre',
        )
        .required('Confirmation du mot de passe requise'),
    }),
    onSubmit: values => {
      submitNewPassword(values.oldPassword, values.newPassword);
    },
  });

  return (
    <Modal
      open={showPasswordModal}
      onClose={() => setShowPasswordModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Item
        customheight="auto"
        customwidth="75vw"
        margintop="0"
        position="relative"
      >
        {onSuccess ? (
          <CustomAlert
            type={'success'}
            message={'Votre mot de passe a bien été modifié.'}
            setOnSuccess={setOnSuccess}
            setShowModal={setShowPasswordModal}
          />
        ) : onSuccess === false ? (
          <CustomAlert
            type={'error'}
            message={'Erreur dans la modification du mot de passe.'}
            setOnSuccess={setOnSuccess}
            setShowModal={setShowPasswordModal}
          />
        ) : (
          <>
            <Stack
              direction="row"
              height="30px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'Modifiez votre mot de passe'}
              </Typography>
              <CloseIcon
                sx={{ fontSize: '17px', cursor: 'pointer' }}
                onClick={() => setShowPasswordModal(false)}
              />
            </Stack>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              {/* Input caché pour l'accessibilité */}
              <input
                type="text"
                name="username" // Remplacez par le nom d'utilisateur ou l'email de l'utilisateur
                value={`${userInfos.first_name} ${userInfos.last_name}`}
                autoComplete="new-password"
                readOnly
                style={{ display: 'none' }}
              />
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                margin="18px 0"
                padding="0 13px"
              >
                <label htmlFor="old-password">Votre ancien mot de passe</label>
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{
                    alignItems: 'center',
                  }}
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                >
                  <Input
                    name="oldPassword"
                    id="old-password"
                    type="password"
                    autoComplete="current-password"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      height: 'auto',
                      width: '175px',
                      borderRadius: '0',
                      backgroundColor: '#eeeeee',
                    }}
                  />
                  <FormHelperText sx={{ height: '20px' }}>
                    {formik.touched.oldPassword && formik.errors.oldPassword}
                  </FormHelperText>
                </FormControl>
                <label htmlFor="newpassword">Votre nouveau mot de passe</label>
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{
                    alignItems: 'center',
                  }}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                >
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      height: 'auto',
                      width: '175px',
                      borderRadius: '0',
                      backgroundColor: '#eeeeee',
                    }}
                  />
                  <FormHelperText sx={{ minHeight: '20px' }}>
                    {formik.touched.newPassword && formik.errors.newPassword}
                  </FormHelperText>
                </FormControl>
                <label htmlFor="confirmpassword">
                  Confirmez le nouveau mot de passe
                </label>
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{
                    alignItems: 'center',
                  }}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                >
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="false"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      height: 'auto',
                      width: '175px',
                      borderRadius: '0',
                      backgroundColor: '#eeeeee',
                    }}
                  />
                  <FormHelperText sx={{ height: '20px' }}>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </FormHelperText>
                </FormControl>
                <Stack direction="row" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      maxWidth: '100px',
                      maxHeight: '30px',
                      backgroundColor: '#F29E50',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#a09f9f',
                      },
                    }}
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    {'Valider'}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </>
        )}
      </Item>
    </Modal>
  );
};

AccountUpdatePassword.propTypes = {
  showPasswordModal: PropTypes.bool.isRequired,
  setShowPasswordModal: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
};

export default AccountUpdatePassword;
