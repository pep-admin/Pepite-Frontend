// Import des libs externes
import { Stack, Box, Divider, Card, Skeleton } from '@mui/material';

// Import des composants customisés
import { Item } from '@utils/components/styledComponent';

// Import des composants internes
import CriticAdvicesContentSkeleton from './CriticAdvicesContentSkeleton';

const SkeletonCard = () => {
  return (
    <Item marginbottom="15px">
      <Stack height="100%">
        <Stack direction="column" position="relative">
          <Stack
            direction="row"
            height="48px"
            alignItems="center"
            columnGap="10px"
            padding="0 10px"
          >
            <Skeleton variant="circular" height={40} width={40} />
            <Stack width="75%">
              <Skeleton
                variant="text"
                sx={{
                  fontSize: '0.9em',
                  width: '100%',
                }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: '0.7em',
                  width: '35%',
                }}
                animation="wave"
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack padding="10px 10px 0 10px">
          <Card
            sx={{
              height: 140,
              width: 90,
              boxShadow: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'visible',
            }}
          >
            <Box marginBottom="0" minHeight="120px" display="flex" flexGrow="1">
              <Stack height="auto" justifyContent="center">
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={120}
                  animation="wave"
                />
              </Stack>
              <CriticAdvicesContentSkeleton />
            </Box>
            <Stack
              direction="row"
              flexGrow="1"
              marginBottom="7px"
              sx={{
                maxHeight: '0px',
                overflowY: 'scroll',
                transition: 'max-height 0.5s ease-in-out',
              }}
            >
              <Divider
                orientation="vertical"
                sx={{ borderColor: 'primary.dark' }}
              />
              <Stack height="auto" width="100%" justifyContent="center">
                <Skeleton variant="rounded" height={70} animation="wave" />
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Item>
  );
};

export default SkeletonCard;
