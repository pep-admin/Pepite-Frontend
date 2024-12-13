import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import RegisterFormComponent from '@views/Auth/RegistrationFormComponent';

// Import des variables d'environnement
import { apiBaseUrl } from '@utils/request/config';
import CustomAlert from '@utils/components/Infos/CustomAlert';

// Schéma de vérification Yup
const validationSchema = Yup.object({
  lastName: Yup.string()
    .min(2, 'Le nom doit comporter au moins 2 caractères')
    .required('Le nom est requis'),

  firstName: Yup.string()
    .min(2, 'Le prénom doit comporter au moins 2 caractères')
    .required('Le prénom est requis'),

  email: Yup.string()
    .email("L'adresse e-mail doit être valide")
    .required("L'adresse e-mail est requise"),

  password: Yup.string()
    .min(8, 'Doit contenir au moins 8 caractères')
    .matches(/[A-Z]/, 'Une majuscule requise')
    .matches(/[a-z]/, 'Une minuscule requise')
    .matches(/\d/, 'Un chiffre requis')
    .matches(/\W/, 'Un caractère spécial requis')
    .required('Le mot de passe est requis'),

  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les mots de passe ne correspondent pas',
    )
    .required('La confirmation du mot de passe est requise'),
});

// Valeurs initiales prévues dans le formulaire
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const RegisterFormContainer = ({ setAuthPage }) => {

  const [showAlert, setShowAlert] = useState({ display: false, error: false, severity: '', message: '' });

  const register = async values => {
    try {
      console.log('submit register');
      
      // Envoie les données utilisateurs pour inscription
      const response = await axios({
        method: 'post',
        url: `${apiBaseUrl}/auth/register`,
        withCredentials: true,
        data: {
          last_name: values.lastName,
          first_name: values.firstName,
          email: values.email,
          new_password: values.password,
        },
      });

      setShowAlert({
        display: true,
        error: false,
        severity: 'success',
        message: `${response.data.message}`
      })

    } catch (error) {
      console.log(error);
      
      setShowAlert({
        display: true,
        error: true,
        severity: 'error',
        message: `${error.message}`
      })
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <RegisterFormComponent formik={formik} setAuthPage={setAuthPage} />
      {
        showAlert.display ?
          <CustomAlert alertType={showAlert.severity} message={showAlert.message} setShowAlert={setShowAlert} />
        : null
      }
    </>
  );
};

export default RegisterFormContainer;
