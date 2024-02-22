import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import TopContributorIcon from '@utils/components/TopContributorIcon';
import { apiBaseUrl } from '@utils/request/config';
import { getTopContributorsRequest } from '@utils/request/users/getTopContributorsRequest';
import React, { useEffect, useState } from 'react';

const TopContributors = () => {
  
  const [contributors, setContributors] = useState([]);

  const getTopContributors = async() => {
    const response = await getTopContributorsRequest();
    console.log('les contributeurs', response);
    setContributors(response);
  }

  useEffect(() => {
    getTopContributors();
  }, []);

  return (
    <Stack 
      direction='row' 
      whiteSpace='nowrap'
      columnGap='7px'
      sx={{
        minWidth: contributors.length * 77,
      }}
    >
      {
        contributors.map((user, index) => {
          return(
            <Stack 
              key={user.id} 
              width='70px'
              rowGap='7px' 
              justifyContent='center' 
              alignItems='center'
              position='relative'
            >
              <Badge 
                badgeContent={user.total_contributions} 
                color='secondary'
                sx={{
                  '& .MuiBadge-badge': {
                    right: 0,
                    top: 10,
                    border: `2px solid`,
                    padding: '0 4px',
                  },
                }}
              >
                <Avatar 
                  alt={`photo de profil de ${user.first_name} ${user.last_name}`} 
                  src={`${apiBaseUrl}/Uploads/${user.file_path}`} 
                  sx={{
                    height: 60,
                    width: 60,
                    boxShadow: '0px 3px 3.7px rgba(0, 0, 0, 0.30)'
                  }}
                />
              </Badge>
              {
                index === 0 ?
                  <TopContributorIcon
                    color='#FFD700'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />
                : index === 1 ?     
                  <TopContributorIcon
                    color='#C0C0C0'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />  
                : index === 2 ?
                  <TopContributorIcon
                    color='#8D6D17'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />  
                : null
              }
                  
              <Typography 
                fontSize='0.85em' 
                color='#737373' 
                fontWeight='300'
                whiteSpace='nowrap'
                letterSpacing='-0.4px'
                maxWidth='70px'
                overflow='hidden'
                textOverflow='ellipsis'
                marginBottom='5px'
              >
                {`${user.first_name} ${user.last_name.charAt(0)}.`}
              </Typography>
            </Stack>
         
          )
        })
      }
    </Stack>
  );
};

export default TopContributors;