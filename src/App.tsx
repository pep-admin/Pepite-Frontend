// Import de libs externes
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@styles/theme';
// Import des hooks
import useFontLoader from '@hooks/useFontLoader';
// Import des composants
import Film from '@views/Film';
import Home from '@views/Home';
import About from '@views/About';
import RegistrationForm from '@views/Auth/RegistrationForm';
import LoginForm from '@views/Auth/LoginForm';

export function App() {
  // Permet d'afficher la page dès que les polices sont chargées
  useFontLoader();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/film/:id" element={<Film />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
