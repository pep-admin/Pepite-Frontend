import { getDetailsNumber } from '@utils/request/profil/getDetailsNumber';

// Compte le nombre de critiques, les pépites, les navets d'un utilisateur
export const countUserAdditionalInfosRequest = async userId => {
  const count = await getDetailsNumber(userId);
  const criticsNumber = count.totalCriticsCount;
  const goldsNumber = count.totalGoldCount;

  return { criticsNumber, goldsNumber };
};
