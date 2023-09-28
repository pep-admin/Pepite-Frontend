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
import RegisterFormContainer from './containers/Auth/RegisterFormContainer';
import LoginFormContainer from './containers/Auth/LoginFormContainer';
import SwipeContainer from './containers/Swipe/SwipeContainer';

export function App() {
  // Permet d'afficher la page dès que les polices sont chargées
  useFontLoader();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginFormContainer />} />
            <Route path="/register" element={<RegisterFormContainer />} />
            <Route path="/about" element={<About />} />
            <Route path="/swipe" element={<SwipeContainer />} />
            <Route path="/" element={<Home />} />
            <Route path="/film/:id" element={<Film />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
