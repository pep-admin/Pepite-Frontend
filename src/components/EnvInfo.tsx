import { Card, Divider, Stack, Typography } from '@mui/material';
import { formatDateTime } from '@utils/dates/formatDate';

import { getBuildDate } from '@utils/dates/getBuildDate';

export function EnvInfo() {
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === 'development';

  const gitCommitDate = import.meta.env.VITE_GIT_COMMIT_DATE;
  const gitBranchName = import.meta.env.VITE_GIT_BRANCH_NAME;
  const gitCommitHash = import.meta.env.VITE_GIT_COMMIT_HASH;
  const gitLastCommitMessage = import.meta.env.VITE_GIT_LAST_COMMIT_MESSAGE;

  const formattedCommitDate = formatDateTime(gitCommitDate);
  const buildDate = getBuildDate();

  const prefixStyle = {
    color: 'gray',
    textDecoration: 'underline',
  };

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        padding: 2,
        mt: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Front-end info</Typography>
        <Divider />
        <Stack justifyContent={'start'} alignItems={'start'}>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Mode:'}
            </Typography>
            <Typography component={'span'}>{mode}</Typography>
          </Typography>
          {isDevelopment === false && (
            <Typography display={'flex'} gap={1}>
              <Typography component={'span'} sx={prefixStyle}>
                {'Build date:'}
              </Typography>
              <Typography component={'span'}>{buildDate}</Typography>
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack justifyContent={'start'} alignItems={'start'}>
          <Typography display={'flex'} gap={1}>
            <Typography component={'span'} sx={prefixStyle}>
              {'Branch:'}
            </Typography>
            <Typography component={'span'}>{gitBranchName}</Typography>
          </Typography>
          <Typography>
            <Typography sx={prefixStyle}>{'Last commit details:'}</Typography>
          </Typography>
          <Typography>{formattedCommitDate}</Typography>
          <Typography>{gitCommitHash}</Typography>
          <Typography>{gitLastCommitMessage}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
