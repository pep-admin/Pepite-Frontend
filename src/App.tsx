import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@styles/theme';
import FontFaceObserver from 'fontfaceobserver';

import Film from './views/Film';
import Home from './views/Home';
import About from './views/About';
import RegistrationForm from './views/Auth/RegistrationForm';
import LoginForm from './views/Auth/LoginForm';
import { useEffect } from 'react';

export function App() {
  // Permet d'afficher la page dès que les polices sont chargées
  const loadFontAndShowContent = () => {
    const font1 = new FontFaceObserver('Nixie One');
    const font2 = new FontFaceObserver('Pragati Narrow');

    const promises = [font1.load(), font2.load()];

    Promise.all(promises)
      .then(() => {
        document.getElementById('root').style.display = 'block';
      })
      .catch(() => {
        console.error('Erreur lors du chargement des polices');
      });
  };

  useEffect(() => {
    loadFontAndShowContent();
  }, []);

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
