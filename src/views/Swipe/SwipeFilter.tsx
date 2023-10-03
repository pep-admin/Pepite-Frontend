// Import des libs externes
import * as React from 'react';
import { Box, Menu, MenuItem, Button, Fade, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';

// Liste des genres proposés
const kindList = [
  'Action',
  'Animation',
  'Aventure',
  'Comédie',
  'Crime',
  'Documentaire',
  'Drame',
  'Familial',
  'Fantastique',
  'Guerre',
  'Histoire',
  'Horreur',
  'Musique',
  'Mystère',
  'Romance',
  'Science-Fiction',
  'Thriller',
  'Téléfilm',
  'Western',
];

// Légende des notes
const labels: { [index: string]: string } = {
  0.5: 'Terrible',
  1: 'Mauvais',
  1.5: 'Médiocre',
  2: 'Passable',
  2.5: 'Moyen',
  3: 'Pas mal',
  3.5: 'Bon',
  4: 'Très bon',
  4.5: 'Excellent',
  5: "Chef d'œuvre",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const SwipeFilter = ({ Item }) => {
  // Filtre selon films ou séries
  const [typeFilter, setTypeFilter] = React.useState(null);
  const openType = Boolean(typeFilter);
  const handleTypeClick = event => {
    setTypeFilter(event.currentTarget);
  };
  const handleTypeClose = () => {
    setTypeFilter(null);
  };

  // Filtre selon le genre
  const [kindFilter, setKindFilter] = React.useState(null);
  const openKind = Boolean(kindFilter);
  const handleKindClick = event => {
    setKindFilter(event.currentTarget);
  };
  const handleKindClose = () => {
    setKindFilter(null);
  };

  // Filtre selon la note
  const [ratingsFilter, setRatingsFilter] = React.useState(null);
  const openRatings = Boolean(ratingsFilter);
  const handleRatingsClick = event => {
    setRatingsFilter(event.currentTarget);
  };
  const handleRatingsClose = () => {
    setRatingsFilter(null);
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Item
      sx={{
        backgroundColor: '#0E6666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 3%',
      }}
    >
      {/* Filtre par type */}
      <Button
        id="fade-button"
        aria-controls={openType ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openType ? 'true' : undefined}
        onClick={handleTypeClick}
      >
        Type
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={typeFilter}
        open={openType}
        onClose={handleTypeClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleTypeClose}>Films</MenuItem>
        <MenuItem onClick={handleTypeClose}>Séries</MenuItem>
      </Menu>

      {/* Filtre par genre */}
      <Button
        id="fade-button"
        aria-controls={openKind ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openKind ? 'true' : undefined}
        onClick={handleKindClick}
      >
        Genre
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={kindFilter}
        open={openKind}
        onClose={handleKindClose}
        TransitionComponent={Fade}
      >
        {kindList.map((kind, index) => {
          return (
            <MenuItem key={index} onClick={handleKindClose}>
              {kind}
            </MenuItem>
          );
        })}
      </Menu>

      {/* Filtre par note */}
      <Button
        id="fade-button"
        aria-controls={openRatings ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openRatings ? 'true' : undefined}
        onClick={handleRatingsClick}
      >
        Note
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={ratingsFilter}
        open={openRatings}
        onClose={handleRatingsClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleTypeClose}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </MenuItem>
      </Menu>
    </Item>
  );
};

SwipeFilter.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

export default SwipeFilter;
