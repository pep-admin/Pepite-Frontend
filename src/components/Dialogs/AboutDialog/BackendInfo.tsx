import { Card, Divider, Stack, Typography } from '@mui/material';
import { formatDateTime } from '@utils/dates/formatDate';

import { useAbout } from '@utils/request/about';

export function BackendEnvInfo() {
  const { data, isLoading, error } = useAbout();

  const prefixStyle = {
    color: 'gray',
    textDecoration: 'underline',
  };

  if (isLoading) {
    return <Typography>Chargement des informations du backend...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        Erreur lors du chargement des informations : {error}
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        padding: 2,
        mt: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Backend info</Typography>
        <Divider />
        <Stack justifyContent={'start'} alignItems={'start'}>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Mode:'}
            </Typography>
            <Typography component={'span'}>{data?.nodeEnv}</Typography>
          </Typography>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Build date:'}
            </Typography>
            <Typography component={'span'}>
              {formatDateTime(data?.buildDate)}
            </Typography>
          </Typography>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Branch:'}
            </Typography>
            <Typography component={'span'}>{data?.gitBranchName}</Typography>
          </Typography>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Last commit details:'}
            </Typography>
            {/* Supposant que vous voulez afficher la date du dernier commit ici */}
            <Typography component={'span'}>
              {formatDateTime(data?.gitCommitDate)}
            </Typography>
          </Typography>
          <Typography>{data?.gitCommitHash}</Typography>
          <Typography>{data?.gitLastCommitMessage}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
