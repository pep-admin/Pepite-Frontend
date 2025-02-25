import { Box, Tab, Tabs, useTheme } from '@mui/material';

const ListNav = ({ setListSectionIndex, listSectionIndex }) => {
  const theme = useTheme();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleSectionChange = (_, newValue) => {
    setListSectionIndex(newValue);
  };

  return (
    <Box
      sx={{
        height: '48px',
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Tabs
        value={listSectionIndex}
        onChange={handleSectionChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{
          '& .MuiTab-root': {
            color: theme.palette.common.white,
            overflow: 'visible',
          },
          '& .Mui-selected': {
            color: `${theme.palette.secondary.main} !important`,
          },
        }}
      >
        <Tab label="À VOIR" {...a11yProps(1)} />
        <Tab label="À NOTER" {...a11yProps(1)} />
        <Tab label="NOTÉS" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
};

export default ListNav;
