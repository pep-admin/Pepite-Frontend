// Import de libs externes
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import LoginFormComponent from '@views/Auth/LoginFormComponent';

// Schéma de vérification Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
});

// Valeurs initiales prévues dans le formulaire
const initialValues = {
  email: '',
  password: '',
};

const LoginFormContainer = () => {
  const navigate = useNavigate();

  // Envoie les données utilisateurs pour connexion
  const login = async values => {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:8800/api/auth/login`,
        withCredentials: true,
        data: {
          email: values.email,
          password_hash: values.password,
        },
      });

      console.log('succès', response.data);

      if (response.data.last_login_date === null) {
        navigate('/about');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        formik.setStatus({ state: 'error', message: `${error.response.data}` });
      } else {
        formik.setStatus({
          state: 'error',
          message: 'Erreur lors de la connexion.',
        });
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
  });

  return <LoginFormComponent formik={formik} />;
};

export default LoginFormContainer;
