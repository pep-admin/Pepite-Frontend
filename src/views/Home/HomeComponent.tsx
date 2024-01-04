// Import des libs externes
import { Container, Stack } from '@mui/material';
import { useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import ContactsComponent from '@views/Contacts/ContactsComponent';
import ProfilSuggestedNotes from '@views/Profil/ProfilSuggestedNotes';

const Home = () => {
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil

  // Utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="column" spacing={1}>
          <SearchBar
            Item={Item}
            page={'contacts'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <ContactsComponent page={'home'} />
          <Item
            customheight="calc(100% - 6px)"
            customwidth="100%"
            margintop="6px"
            overflow="hidden"
          >
            <ProfilSuggestedNotes
              page={'home'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              userInfos={userInfos}
            />
          </Item>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
