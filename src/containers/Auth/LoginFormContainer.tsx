// Import de libs externes
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import LoginFormComponent from '@views/Auth/LoginFormComponent';

// Import des variables d'environnement
import { apiBaseUrl } from '@utils/request/config';
import { useEffect, useState } from 'react';
import CustomAlert from '@utils/components/Infos/CustomAlert';

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

const LoginFormContainer = ({ setAuthPage }) => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false); // Ajout de l'état pour suivre si le formulaire a été soumis
  const [showAlert, setShowAlert] = useState({ display: false, error: false, severity: '', message: '' });

  // Envoie les données utilisateurs pour connexion
  const login = async values => {
    try {      
      setIsSubmitted(true);

      const response = await axios({
        method: 'post',
        url: `${apiBaseUrl}/auth/login`,
        withCredentials: true,
        data: {
          email: values.email,
          password_hash: values.password,
        },
      });

      // TO DO : faire péter user_id
      // localStorage.setItem('user_id', JSON.stringify(response.data.id));
      localStorage.setItem('user_infos', JSON.stringify(response.data));

      if (response.data.last_login_date === null) {
        navigate('/preferences');
      } else {
        navigate(`/home/${response.data.id}`);
      }
    } catch (error) {
      console.log('erreur login');
      
      if (error.response && error.response.data) {
        setShowAlert({
          display: true,
          error: true,
          severity: 'error',
          message: `${error.response.data}`
        })
      } else {
        setShowAlert({
          display: true,
          error: true,
          severity: 'error',
          message: 'Erreur serveur: impossible de se connecter.'
        })
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
  });

  useEffect(() => {
    console.log(showAlert);
    
  }, [showAlert])

  return (
    <>
      <LoginFormComponent formik={formik} isSubmitted={isSubmitted} setAuthPage={setAuthPage} />
      { isSubmitted && showAlert.display ?
        <CustomAlert alertType={showAlert.severity} message={showAlert.message} setShowAlert={setShowAlert} />
        : null
      }
    </>
  );
};

export default LoginFormContainer;
