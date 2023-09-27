import { GW2UserType } from '../interfaces/gw2/user';
import { keysToCamel } from '../utils/helpers';

export const gw2Service = {
  /**
   *
   * @param gw2ApiKey
   * @returns
   */
  fetchAccount: async (gw2ApiKey: string): Promise<GW2UserType> => {
    return await fetch(
      `${
        import.meta.env.VITE_GW2_API_URL
      }/v2/account?access_token=${gw2ApiKey}`,
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((data) => keysToCamel(data));
  },
  /**
   *
   * @param id
   * @returns
   */
  getGuildById: async (id: string) => {
    return await fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/guild/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => keysToCamel(data));
  },
};
