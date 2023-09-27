import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegisterFormComponent from '../../views/Auth/RegistrationFormComponent';
import { useNavigate } from 'react-router-dom';

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
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Au moins une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial',
    )
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

let redirection;

const RegisterFormContainer = () => {
  const navigate = useNavigate();

  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const onSubmit = async values => {
    try {
      // Envoie les données utilisateurs pour inscription
      const response = await axios({
        method: 'post',
        url: `http://localhost:8800/api/auth/register`,
        withCredentials: true,
        data: {
          last_name: values.lastName,
          first_name: values.firstName,
          email: values.email,
          password_hash: values.password,
        },
      });

      // Fait apparaître un message de succès
      formik.setStatus({ state: 'success', message: `${response.data}` });

      // Redirige vers la page de connexion
      redirection = setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Fais apparaitre un message d'erreur
      formik.setStatus({ state: 'error', message: `${error.response.data}` });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Si l'utilisateur clique sur le bouton de connexion avant la redirection
  useEffect(() => {
    if (isBtnClicked) {
      clearTimeout(redirection);
      setIsBtnClicked(false);
    }
  }, [isBtnClicked]);

  return (
    <RegisterFormComponent formik={formik} setIsBtnClicked={setIsBtnClicked} />
  );
};

export default RegisterFormContainer;
