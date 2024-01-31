// Import des libs externes
import {
  Stack,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useEffect, useState } from 'react';
import { countCriticsAndGoldUser } from '@utils/functions/countCriticsAndGoldUser';

const ProfilDetails = ({ criticsAndAdvices, userInfos, chosenUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [criticsNumber, setCriticsNumber] = useState(0);
  const [goldNuggetsNumber, setGoldNuggetsNumber] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const { criticsNumber, goldNuggetsNumber } =
        await countCriticsAndGoldUser(id);
      setCriticsNumber(criticsNumber);
      setGoldNuggetsNumber(goldNuggetsNumber);
    };

    fetchCounts();
  }, [id, criticsAndAdvices]);

  return (
    <>
      <Stack direction="column" alignItems="center">
        <LinearProgress
          color="success"
          variant="determinate"
          value={30}
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      <Stack flexGrow={1}>
        <List
          sx={{
            listStyleType: 'none',
            height: '100%',
            padding: '7px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <StarIcon fontSize="small" color="secondary" />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="secondary"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {`${criticsNumber}`}
              </Typography>
              <Typography component="p" variant="body2" color="secondary">
                {criticsNumber > 1 ? 'notations' : 'notation'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                  width: '20px',
                  justifyContent: 'flex-end',
                }}
              >
                <img
                  src="/images/gold_nugget.svg"
                  alt=""
                  style={{
                    position: 'relative',
                    top: '0.2px',
                  }}
                />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#EDC800"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {`${goldNuggetsNumber}`}
              </Typography>
              <Typography component="p" variant="body2" color="#EDC800">
                {goldNuggetsNumber > 1 ? 'pépites' : 'pépite'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton sx={{ padding: '0' }}>
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <LocalMoviesIcon fontSize="small" sx={{ color: '#3B3B3B' }} />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#3B3B3B"
                marginRight="2.5px"
                fontWeight="bold"
                onClick={() =>
                  userInfos.id === parseInt(id, 10)
                    ? navigate(`/list/${userInfos.id}`)
                    : navigate(`/list/${chosenUser.id}`)
                }
              >
                {userInfos.id === parseInt(id, 10) ? 'Ma liste' : 'Sa liste'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: '60px', alignSelf: 'center' }} />
          <ListItem sx={{ display: 'flex', padding: '0', columnGap: '5px' }}>
            <ListItemButton
              sx={{ padding: '0' }}
              onClick={() => navigate(`/contacts/${id}`)}
            >
              <ListItemIcon
                sx={{
                  position: 'relative',
                  bottom: '1px',
                  minWidth: 'auto',
                  marginRight: '5px',
                }}
              >
                <PeopleAltIcon
                  fontSize="small"
                  sx={{ color: '#3B3B3B', position: 'relative', left: '1px' }}
                />
              </ListItemIcon>
              <Typography
                component="p"
                variant="body2"
                color="#3B3B3B"
                fontWeight="bold"
                marginRight="2.5px"
              >
                {'Contacts'}
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </>
  );
};

ProfilDetails.propTypes = {
  criticsAndAdvices: PropTypes.array.isRequired,
  userInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
};

export default ProfilDetails;
