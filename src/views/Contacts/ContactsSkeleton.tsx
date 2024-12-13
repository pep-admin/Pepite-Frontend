import { Skeleton, Stack } from '@mui/material';

const ContactsSkeleton = () => {
  return (
    <Stack spacing={3} direction='row'>
      <Stack spacing={2} direction='row' alignItems='center' width='150px'>
        <Skeleton variant='circular' height={50} width={50} animation='wave' sx={{ bgcolor: '#011212' }}/>
        <Skeleton variant='text' sx={{ fontSize: '1em', flexGrow: '1', bgcolor: '#011212' }} animation='wave' />
      </Stack>
      <Stack direction='row' alignItems='center' flexGrow='1'>
        <Skeleton variant='text' sx={{ fontSize: '1em', flexGrow: '1', bgcolor: '#011212' }} animation='wave' />
      </Stack>
    </Stack>
  );
};

export default ContactsSkeleton;