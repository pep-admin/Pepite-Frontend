// Import de libs externes
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@styles/theme';

// Import des hooks
import useFontLoader from '@hooks/useFontLoader';
import { DataProvider } from '@hooks/DataContext';
import { SnackbarProvider } from '@hooks/SnackbarContext';

// Import des composants
import PrivateRoute from './PrivateRoute';
// import Film from '@views/Film';
import About from '@views/About/About';
import RegisterFormContainer from './containers/Auth/RegisterFormContainer';
import LoginFormContainer from './containers/Auth/LoginFormContainer';
import SwipeContainer from './containers/Swipe/SwipeContainer';
import ProfilContainer from './containers/Profil/ProfilContainer';
import AccountContainer from './containers/Account/AccountContainer';
import HomeContainer from './containers/Home/HomeContainer';
import ContactContainer from './containers/Contacts/ContactContainer';
import ListContainer from './containers/List/ListContainer';
// import ScrollToTop from '@utils/components/ScrollToTop';
import FilmContainer from './containers/Film/FilmContainer';
import RatingContainer from './containers/Rating/RatingContainer';
import { AlertProvider } from '@hooks/AlertContext';

export function App() {
  // Permet d'afficher la page dès que les polices sont chargées
  useFontLoader();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <AlertProvider>
            <SnackbarProvider>
              <BrowserRouter>
                {/* <ScrollToTop /> */}
                <Routes>
                  <Route path="/login" element={<LoginFormContainer />} />
                  <Route path="/register" element={<RegisterFormContainer />} />
                  <Route
                    path="/about"
                    element={
                      <PrivateRoute>
                        <About />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/swipe"
                    element={
                      <PrivateRoute>
                        <SwipeContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profil/:id"
                    element={
                      <PrivateRoute>
                        <ProfilContainer />
                      </PrivateRoute>
                    }
                  />
                  {/* <Route
                    path="/account/:id"
                    element={
                      <PrivateRoute>
                        <AccountContainer />
                      </PrivateRoute>
                    }
                  /> */}
                  <Route
                    path="/contacts/:id"
                    element={
                      <PrivateRoute>
                        <ContactContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/list"
                    element={
                      <PrivateRoute>
                        <ListContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <HomeContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/home/:id"
                    element={
                      <PrivateRoute>
                        <HomeContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/rating/:type?/:id?/:action?"
                    element={
                      <PrivateRoute>
                        <RatingContainer />
                      </PrivateRoute>
                    }
                  />
                  <Route 
                    path="/film/:movieOrSerie/:id" 
                    element={
                      <PrivateRoute>
                        <FilmContainer 
                          display={'full-page'} 
                          movie={null} 
                          onClose={null} 
                        />
                      </PrivateRoute>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </SnackbarProvider>
          </AlertProvider>
        </DataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
