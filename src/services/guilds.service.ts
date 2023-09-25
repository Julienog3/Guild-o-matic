import {
  GuildCategoryInterface,
  GuildPayloadInterface,
  GuildType,
} from '../interfaces/guild.interface';
import { supabase } from '../supabaseClient';
import { keysToCamel, keysToSnake } from '../utils/helpers';
import { gw2Service } from './gw2.service';

export const guildsService = {
  getGuilds: async (): Promise<GuildType[]> => {
    const { data, error } = await supabase.from('guilds').select('*');

    if (error) {
      throw new Error("Can't fetch guilds");
    }

    const guilds: GuildType[] = keysToCamel(data);

    return Promise.all(
      guilds.map(async (guild) => {
        const { data: ownerProfile } = await supabase
          .from('profiles')
          .select('api_key')
          .eq('user_id', guild.ownerId);

        if (!ownerProfile) {
          return;
        }

        const gw2Guild = await gw2Service
          .getGuildById(guild.guildId)
          .then((gw2Guild) => {
            const KEYS_ALLOWED = [
              'tag',
              'name',
              'level',
              'memberCapacity',
              'memberCount',
            ];

            return Object.keys(gw2Guild)
              .filter((key) => KEYS_ALLOWED.includes(key))
              .reduce((obj: any, key) => {
                obj[key] = gw2Guild[key];
                return obj;
              }, {});
          });

        const guildCategories = await guildsService
          .getGuildCategoriesById(guild.id)
          .then((categories) => {
            return categories.map((category: any) => category.categories.name);
          });

        return {
          ...guild,
          ...gw2Guild,
          categories: guildCategories,
        };
      }),
    );
  },
  getGuildById: async (id: string): Promise<GuildType | undefined> => {
    const { data, error } = await supabase
      .from('guilds')
      .select('*')
      .eq('id', id);

    if (error) {
      return;
    }

    return keysToCamel(data[0]);
  },
  getUserGuilds: async (userId: string): Promise<GuildType[] | undefined> => {
    const { data, error } = await supabase
      .from('guilds')
      .select('*')
      .eq('owner_id', userId);

    if (error) {
      return;
    }

    const guilds = keysToCamel(data);

    return Promise.all(
      guilds.map(async (guild: GuildType) => {
        const gw2Guild = await gw2Service
          .getGuildById(guild.guildId)
          .then((gw2Guild) => {
            const KEYS_ALLOWED = [
              'tag',
              'name',
              'level',
              'memberCapacity',
              'memberCount',
            ];

            return Object.keys(gw2Guild)
              .filter((key) => KEYS_ALLOWED.includes(key))
              .reduce((obj: any, key) => {
                obj[key] = gw2Guild[key];
                return obj;
              }, {});
          });

        return {
          ...guild,
          ...gw2Guild,
        };
      }),
    );
  },
  getGuildCountByGameId: async (
    guildId: string,
  ): Promise<number | undefined> => {
    const { count, error } = await supabase
      .from('guilds')
      .select('*', { count: 'exact' })
      .eq('guild_id', guildId);

    if (error) {
      return;
    }

    return keysToCamel(count);
  },
  getGuildCategoriesById: async (id: string): Promise<any> => {
    const { data, error } = await supabase
      .from('guilds_category')
      .select('categories (name)')
      .eq('guild_id', id);

    if (error) {
      return;
    }

    return data;
  },
  postGuild: async (guild: GuildPayloadInterface): Promise<any> => {
    const guildPayload = Object.fromEntries(
      Object.entries(guild).filter(([key]) => key !== 'categories'),
    );

    const { data, error } = await supabase
      .from('guilds')
      .insert([keysToSnake(guildPayload)])
      .select();

    if (error) {
      return;
    }

    if (data) {
      guildsService.addCategoriesToGuild(
        keysToCamel(data[0]).id,
        guild.categories,
      );
    }

    return keysToCamel(data[0]);
  },
  updateGuild: async ({
    id,
    guild,
  }: {
    id: string,
    guild: GuildPayloadInterface,
  }): Promise<any> => {
    const guildPayload = Object.fromEntries(
      Object.entries(guild).filter(([key]) => key !== 'categories'),
    );

    console.log(keysToSnake(guildPayload));

    const { data, error } = await supabase
      .from('guilds')
      .update([keysToSnake(guildPayload)])
      .eq('id', id)
      .select();

    if (error) {
      return;
    }

    if (data) {
      console.log('data', data);
    }

    // if (data) {
    //   guildsService.addCategoriesToGuild(
    //     keysToCamel(data[0]).id,
    //     guild.categories,
    //   );
    // }

    // return keysToCamel(data[0]);
  },
  getGuildCategory: async (
    categoryName: string,
  ): Promise<GuildCategoryInterface | undefined> => {
    const { data, error } = await supabase
      .from('categories')
      .select()
      .eq('name', categoryName)
      .limit(1);

    if (error) {
      return;
    }

    return keysToCamel(data[0]);
  },
  addCategoriesToGuild: async (
    guildId: string,
    categories: string[],
  ): Promise<any> => {
    categories.forEach(async (category) => {
      const guildCategory = await guildsService.getGuildCategory(category);

      if (guildCategory === undefined) {
        return;
      }

      const { data, error } = await supabase.from('guilds_category').insert([
        keysToSnake({
          guildId: guildId,
          categoryId: guildCategory.id,
        }),
      ]);

      if (error) {
        return;
      }
    });
  },
  removeCategoriesGuild: async (guildId: string): Promise<any> => {
    const { error } = await supabase
      .from('guilds_category')
      .delete()
      .eq('guild_id', guildId);

    if (error) {
      return;
    }
  },
  deleteGuild: async (id: string): Promise<void> => {
    guildsService.removeCategoriesGuild(id).then(async () => {
      const { error } = await supabase.from('guilds').delete().eq('id', id);

      if (error) {
        return;
      }
    });
  },
};
