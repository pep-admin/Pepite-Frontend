import { Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import GoldNuggetIcon from '@utils/components/GoldNuggetIcon';
import { TurnipIcon } from '@utils/components/styledComponent';

const ProfilAdditionalInfos = ({ additionalInfos }) => {
  console.log(additionalInfos);
  
  const criticsNumber = additionalInfos.criticsNumber;
  const goldsNumber = additionalInfos.goldsNumber;
  const turnipNumber = additionalInfos.turnipNumber;

  const items = [
    {
      id: 0,
      type: `notation${criticsNumber > 1 ? 's' : ''}`,
      number: criticsNumber,
      icon: <StarIcon color='secondary'/>
      ,
      textColor: '#E7AE1A',
    },
    {
      id: 1,
      type: `pépite${goldsNumber > 1 ? 's' : ''}`,
      number: additionalInfos.goldsNumber,
      icon: <GoldNuggetIcon 
        height='23px' 
        width='23px' 
        strokeWidth={2}
        isShadowed={false}
        sx={{
          filter: 'brightness(0.9)',
          position: 'relative',
          top: '1px',
        }}
      />,
      textColor: '#E67500',
    },
    {
      id: 2,
      type: `navet${turnipNumber > 1 ? 's' : ''}`,
      number: 0,
      icon: <TurnipIcon 
        sx={{
          position: 'relative',
          left: '5px'
        }}
      />,
      textColor: '#EB3C98',
    },
  ];
  
  return (
    <Stack 
      direction='row' 
      justifyContent='space-evenly'
    >
      {items.map((item) => {
          return(
            <Stack 
              key={item.id} 
              alignItems='center'
              justifyContent='space-between'
              spacing={1}
            >
              {item.icon}
              <Typography
                fontFamily='Pragati Narrow, sans-serif'
                color={item.textColor}
              >
                {`${item.number} ${item.type}`}
              </Typography>
            </Stack>
          )
        })
      }
    </Stack>
  );
};

export default ProfilAdditionalInfos;