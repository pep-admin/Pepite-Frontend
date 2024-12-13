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
import { Item } from '@utils/components/styledComponent';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';
import { updatePassword } from '@utils/request/users/updatePassword';
import CustomAlert from '@utils/components/Infos/CustomAlert';

const AccountUpdatePassword = ({
  showPasswordModal,
  setShowPasswordModal,
  loggedUserInfos,
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
      <Stack justifyContent="center">
        <Item customheight="auto" customwidth="75vw" position="relative">
          {onSuccess ? (
            <CustomAlert
              alertType={'success'}
              message={'Votre mot de passe a bien été modifié.'}
              // setOnSuccess={setOnSuccess}
              // setShowModal={setShowPasswordModal}
            />
          ) : onSuccess === false ? (
            <CustomAlert
              alertType={'error'}
              message={'Erreur dans la modification du mot de passe.'}
              // setOnSuccess={setOnSuccess}
              // setShowModal={setShowPasswordModal}
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
                  value={`${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`}
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
                  <label htmlFor="old-password">
                    Votre ancien mot de passe
                  </label>
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
                        '&:after': {
                          borderBottomColor: '#24A5A5',
                        },
                      }}
                    />
                    <FormHelperText sx={{ height: '20px' }}>
                      {formik.touched.oldPassword && formik.errors.oldPassword}
                    </FormHelperText>
                  </FormControl>
                  <label htmlFor="newpassword">
                    Votre nouveau mot de passe
                  </label>
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
                        '&:after': {
                          borderBottomColor: '#24A5A5',
                        },
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
                        '&:after': {
                          borderBottomColor: '#24A5A5',
                        },
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
                        width: '130px',
                        height: '30px',
                        padding: '2px 0 0 0',
                        cursor: 'pointer',
                        // Applique un gradient de couleur si le formulaire est valide et modifié, sinon applique une couleur grise
                        background:
                          formik.isValid && formik.dirty
                            ? 'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)'
                            : 'grey',
                        color:
                          formik.isValid && formik.dirty ? '#fff' : '#383838',
                        '&:hover': {
                          background:
                            formik.isValid && formik.dirty
                              ? 'linear-gradient(315deg, rgba(45, 152, 82, 1) 0%, rgba(32, 148, 148, 1) 100%)'
                              : 'grey',
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
      </Stack>
    </Modal>
  );
};

AccountUpdatePassword.propTypes = {
  showPasswordModal: PropTypes.bool.isRequired,
  setShowPasswordModal: PropTypes.func.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
};

export default AccountUpdatePassword;
