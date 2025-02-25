import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { calculateSkeletonCount } from '@utils/functions/calculateSkeletonCount';
import { getMovieExternalLinksRequest } from '@utils/request/film/getMoviesExternalLinksRequest';
import { useEffect, useState } from 'react';
import { ExternalIds } from 'types/interface';
import imdbLogo from '../../utils/icons/imdbIcon.svg';
import wikidataLogo from '../../utils/icons/wikidata.svg';
import facebookLogo from '../../utils/icons/facebookLogo.svg';
import instagramLogo from '../../utils/icons/instagramLogo.svg';
import xLogo from '../../utils/icons/xLogo.svg';

const FilmExternalLinks = ({ isMovieOrSerie, movie }) => {
  const [externalLinks, setExternalLinks] = useState<ExternalIds>({});
  const [areLinksLoading, setAreLinksLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  const getMovieExternalLinks = async () => {
    try {
      setAreLinksLoading(true);
      const links = await getMovieExternalLinksRequest(
        isMovieOrSerie,
        movie.id,
      );
      console.log('les fournisseurs =>', links);
      setExternalLinks(links);
    } catch (error) {
      console.log(error);
    } finally {
      setAreLinksLoading(false);
    }
  };

  useEffect(() => {
    calculateSkeletonCount(80, 0.9, setSkeletonCount); // Calcul initial

    const handleResize = () => {
      calculateSkeletonCount(80, 0.9, setSkeletonCount);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getMovieExternalLinks();
  }, []);

  // Tableau de mappage des liens externes
  const externalInfoLinksMapping = [
    {
      id: 'imdb_id',
      name: 'IMDb',
      url: `https://www.imdb.com/title/${externalLinks.imdb_id}`,
      logo: imdbLogo,
    },
    {
      id: 'wikidata_id',
      name: 'Wikidata',
      url: `https://www.wikidata.org/wiki/${externalLinks.wikidata_id}`,
      logo: wikidataLogo,
    },
  ];

  // Tableau de mappage des liens externes
  const socialNetworksLinksMapping = [
    {
      id: 'facebook_id',
      name: 'Facebook',
      url: `https://www.facebook.com/${externalLinks.facebook_id}`,
      logo: facebookLogo,
    },
    {
      id: 'instagram_id',
      name: 'Instagram',
      url: `https://www.instagram.com/${externalLinks.instagram_id}`,
      logo: instagramLogo,
    },
    {
      id: 'twitter_id',
      name: 'X',
      url: `https://x.com/${externalLinks.twitter_id}`,
      logo: xLogo,
    },
  ];

  return (
    <Container
      sx={{
        paddingLeft: '5vw',
        paddingRight: '5vw',
      }}
    >
      <Stack spacing={3} padding="30px 0 40px 0">
        <Typography
          component="h2"
          color="text.primary"
          fontSize="1.15em"
          fontWeight="400"
          textTransform="uppercase"
        >
          {`En savoir +`}
        </Typography>
        <Stack spacing={5}>
          <Stack spacing={3}>
            <Typography
              component="h2"
              color="gray"
              fontSize="1em"
              fontWeight="400"
              lineHeight="1"
            >
              {`Informations détaillées`}
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              sx={{
                overflowY: 'hidden',
                overflowX: 'auto',
              }}
            >
              {areLinksLoading
                ? Array.from({ length: skeletonCount }).map((_, index) => (
                    <Stack
                      key={index}
                      alignItems="center"
                      width="80px"
                      flexShrink={0}
                    >
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={65}
                        height={65}
                      />
                      <Skeleton
                        width="60%"
                        animation="wave"
                        sx={{ margin: '8px auto' }}
                      />
                    </Stack>
                  ))
                : externalInfoLinksMapping.map(
                    link =>
                      externalLinks[link.id] && (
                        <Stack
                          key={link.id}
                          alignItems="center"
                          width="80px"
                          flexShrink="0"
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                          }}
                        >
                          <img
                            src={link.logo}
                            alt={`Logo de ${link.name}`}
                            height="65px"
                            width="65px"
                          />
                          <Typography
                            align="center"
                            fontFamily="Pragati Narrow, sans-serif"
                            fontSize="0.9em"
                            lineHeight="1.3"
                            marginTop="10px"
                          >
                            {link.name}
                          </Typography>
                        </Stack>
                      ),
                  )}
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Typography
              component="h2"
              color="gray"
              fontSize="1em"
              fontWeight="400"
              lineHeight="1"
            >
              {`Réseaux sociaux`}
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              sx={{
                overflowY: 'hidden',
                overflowX: 'auto',
              }}
            >
              {areLinksLoading
                ? Array.from({ length: skeletonCount }).map((_, index) => (
                    <Stack
                      key={index}
                      alignItems="center"
                      width="80px"
                      flexShrink={0}
                    >
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={65}
                        height={65}
                      />
                      <Skeleton
                        width="60%"
                        animation="wave"
                        sx={{ margin: '8px auto' }}
                      />
                    </Stack>
                  ))
                : socialNetworksLinksMapping.map(
                    link =>
                      externalLinks[link.id] && (
                        <Stack
                          key={link.id}
                          alignItems="center"
                          width="80px"
                          flexShrink="0"
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                          }}
                        >
                          <img
                            src={link.logo}
                            alt={`Logo de ${link.name}`}
                            height="65px"
                            width="65px"
                          />
                          <Typography
                            align="center"
                            fontFamily="Pragati Narrow, sans-serif"
                            fontSize="0.9em"
                            lineHeight="1.3"
                            marginTop="10px"
                          >
                            {link.name}
                          </Typography>
                        </Stack>
                      ),
                  )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FilmExternalLinks;
