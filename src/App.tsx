// Import de libs externes
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@styles/theme';

// Import des hooks
import useFontLoader from '@hooks/useFontLoader';
import { DataProvider } from '@hooks/DataContext';

// Import des composants
import Film from '@views/Film';
import About from '@views/About';
import RegisterFormContainer from './containers/Auth/RegisterFormContainer';
import LoginFormContainer from './containers/Auth/LoginFormContainer';
import SwipeContainer from './containers/Swipe/SwipeContainer';
import ProfilContainer from './containers/Profil/ProfilContainer';
import AccountContainer from './containers/Account/AccountContainer';
import HomeContainer from './containers/Home/HomeContainer';
import ContactContainer from './containers/Contacts/ContactContainer';

export function App() {
  // Permet d'afficher la page dès que les polices sont chargées
  useFontLoader();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginFormContainer />} />
              <Route path="/register" element={<RegisterFormContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/swipe" element={<SwipeContainer />} />
              <Route path="/profil/:id" element={<ProfilContainer />} />
              <Route path="/account/:id" element={<AccountContainer />} />
              <Route path="/contacts/:id" element={<ContactContainer />} />
              <Route path="/" element={<HomeContainer />} />
              <Route path="/home/:id" element={<HomeContainer />} />
              <Route path="/film/:id" element={<Film />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
