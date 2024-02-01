import { getDetailsNumber } from '@utils/request/profil/getDetailsNumber';

export const countCriticsAndGoldUser = async userId => {
  const count = await getDetailsNumber(userId);
  const criticsNumber = count.totalCriticsCount;
  const goldNuggetsNumber = count.totalGoldCount;

  return { criticsNumber, goldNuggetsNumber };
};
