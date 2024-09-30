import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const HomeNav = ({ homeSectionIndex, setHomeSectionIndex }) => {

  const theme = useTheme();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleSectionChange = (_, newValue) => {
    setHomeSectionIndex(newValue);
  };

  return (
    <Box sx={{ height: '48px', marginTop: '5px', backgroundColor: theme.palette.primary.dark }}>
      <Tabs
        value={homeSectionIndex}
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
        <Tab label="POPULAIRES" {...a11yProps(0)} />
        <Tab label="AMIS"  {...a11yProps(1)} />
        <Tab label="SUIVIS" {...a11yProps(2)} />
        <Tab label="À VENIR" {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default HomeNav;
