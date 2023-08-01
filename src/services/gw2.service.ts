import { keysToCamel } from '../utils/helpers';

export const gw2Service = {
  getGuildById: async (id: string) => {
    return await fetch(
      `${import.meta.env.VITE_GW2_API_URL}/v2/guild/${id}?access_token=${
        import.meta.env.VITE_GW2_API_KEY
      }`,
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((data) => keysToCamel(data));
  },
};
