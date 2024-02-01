// Import des libs externes
import { Stack, Skeleton } from '@mui/material';

const CriticAdvicesContentSkeleton = () => {
  return (
    <Stack height={120} justifyContent="space-between" paddingLeft="12px">
      <Skeleton
        variant="text"
        sx={{ fontSize: '1.2em' }}
        width={200}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '0.7em' }}
        width={100}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '0.7em' }}
        width={100}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '0.7em' }}
        width={100}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '0.7em' }}
        width={100}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '0.7em' }}
        width={100}
        animation="wave"
      />
    </Stack>
  );
};

export default CriticAdvicesContentSkeleton;
