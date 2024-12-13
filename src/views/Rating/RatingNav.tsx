import { Box, Tab, Tabs, useTheme } from '@mui/material';

const RatingNav = ({ ratingSectionIndex, setRatingSectionIndex }) => {
  const theme = useTheme();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleSectionChange = (_, newValue) => {
    setRatingSectionIndex(newValue);
  };

  return (
    <Box
      sx={{
        height: '48px',
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Tabs
        value={ratingSectionIndex}
        onChange={handleSectionChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{
          '& .MuiTab-root': {
            color: theme.palette.common.white, // Couleur de texte blanche par défaut
          },
          '& .Mui-selected': {
            color: `${theme.palette.secondary.main} !important`, // Couleur de texte jaune quand sélectionné
          },
        }}
      >
        <Tab label="NOTER" {...a11yProps(0)} />
        <Tab label="CONSEILLER" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
};

export default RatingNav;
