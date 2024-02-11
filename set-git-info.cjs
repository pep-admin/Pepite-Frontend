/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const git = require('git-rev-sync');
const path = require('path');

const { date, branch, message, short } = git;
const gitInfo = `
VITE_GIT_COMMIT_DATE=${date()}
VITE_GIT_BRANCH_NAME=${branch()}
VITE_GIT_COMMIT_HASH=${short()}
VITE_GIT_LAST_COMMIT_MESSAGE=${message()}
`;

fs.writeFileSync(path.resolve(__dirname, '.env.local'), gitInfo);
