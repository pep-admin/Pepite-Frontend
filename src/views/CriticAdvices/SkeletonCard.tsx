// Import des libs externes
import { Stack, Box, Divider, Card, Skeleton } from '@mui/material';

// Import des composants customisés
import { Item } from '@utils/styledComponent';

// Import des composants internes
import CriticAdvicesContentSkeleton from './CriticAdvicesContentSkeleton';

const SkeletonCard = () => {
  return (
    <Item margintop="6px">
      <Stack height="100%">
        <Stack direction="column" position="relative">
          <Stack height="35px" justifyContent="center" padding="0 8px">
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              animation="wave"
            />
          </Stack>
        </Stack>
        <Stack padding="10px 8px">
          <Card
            sx={{
              height: '100%',
              width: 'auto',
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
