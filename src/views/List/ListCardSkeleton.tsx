import { Divider, Skeleton, Stack } from '@mui/material';

const ListCardSkeleton = () => {
  return (
    <Stack padding='0 5vw'>
      <Stack direction='row'>
        <Stack 
          direction='row' 
          justifyContent='space-between' 
          flexGrow='1'
        >
          <Stack>
            <Skeleton 
              variant='rectangular' 
              animation='wave' 
              sx={{ height: '100px', aspectRatio: '2/3'}}
            />
          </Stack>
          <Stack 
            direction='row' 
            justifyContent='space-between' 
            flexGrow='1' 
            paddingTop='4px'
          >
            <Stack width='100%' padding='0 0 0 15px'>
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ fontSize: '1em', width: '75%'}}
              />
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ fontSize: '0.8em', width: '54%'}}
              />
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ fontSize: '0.8em', width: '40%'}}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Skeleton 
            variant='rectangular' 
            animation='wave'
            sx={{
              height: '33px',
              width: '33px'
            }}
          />
          <Skeleton 
            variant='rectangular' 
            animation='wave'
            sx={{
              height: '33px',
              width: '33px'
            }}
          />
          <Skeleton 
            variant='rectangular' 
            animation='wave'
            sx={{
              height: '33px',
              width: '33px'
            }}
          />
        </Stack>
      </Stack> 
      <Divider sx={{ borderColor: '#173333', zIndex: 100, marginTop: '18px' }} />
    </Stack>
  );
};

export default ListCardSkeleton;