import { Box, Tab, Tabs, Badge, useTheme } from '@mui/material';

const ContactsNav = ({ setContactsSectionIndex, contactsSectionIndex, friendRequestsCount }) => {
  const theme = useTheme();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleSectionChange = (_, newValue) => {
    setContactsSectionIndex(newValue);
  };

  return (
    <Box
      sx={{
        height: '48px',
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Tabs
        value={contactsSectionIndex}
        onChange={handleSectionChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{
          '& .MuiTab-root': {
            color: theme.palette.common.white, 
          },
          '& .Mui-selected': {
            color: `${theme.palette.secondary.main} !important`, 
          },
        }}
      >
        <Tab 
          label={
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              DEMANDES
              {friendRequestsCount > 0 && (
                <Badge 
                  color="error" 
                  badgeContent={friendRequestsCount} 
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.9em',
                      backgroundColor: '#835F00',
                      color: '#fff',
                      top: '-12px',
                      right: '-18px',
                    }
                  }}
                />
              )}
            </Box>
          } 
          {...a11yProps(0)} 
        />
        <Tab label="AMIS" {...a11yProps(1)} />
        <Tab label="SUIVIS" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
};

export default ContactsNav;
