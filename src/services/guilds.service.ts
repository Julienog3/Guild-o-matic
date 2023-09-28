import {
  GuildCategoryEnum,
  GuildCategoryInterface,
  GuildPayloadInterface,
  GuildType,
} from '../interfaces/guild.interface';
import { ProfileType } from '../interfaces/profile.interface';
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

        const guildCategories = await guildsService.getGuildCategoriesById(
          guild.id,
        );

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
      .eq('id', id)
      .limit(1);

    if (error) {
      return;
    }

    const guild = keysToCamel(data[0]);

    const guildCategories = await guildsService.getGuildCategoriesById(
      guild.id,
    );

    return { ...guild, categories: guildCategories };
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
  getGuildOwnerProfile: async (
    ownerId: string,
  ): Promise<ProfileType | undefined> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', ownerId);

    if (error) {
      return;
    }

    const formattedData = keysToCamel(data[0]);
    return formattedData;
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
  getGuildCategoriesById: async (id: string): Promise<string[] | undefined> => {
    const { data, error } = await supabase
      .from('guilds_category')
      .select('category_id')
      .eq('guild_id', id);

    if (error) {
      return;
    }

    const guildCategories = data.map((category) => category.category_id);
    return guildCategories;
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
      const guildId = keysToCamel(data[0]).id;

      // guildsService.addCategoriesToGuild(guildId, guild.categories);
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

    const { data, error } = await supabase
      .from('guilds')
      .update(keysToSnake(guildPayload))
      .eq('id', id)
      .select();

    if (error) {
      return;
    }

    if (data) {
      const newGuild = keysToCamel(data[0]);
      const allGuildCategories = await guildsService.getAllGuildCategories(
        newGuild.id,
      );

      console.log('allGuildCategories', allGuildCategories);

      allGuildCategories?.forEach(async (category) => {
        if (!guild.categories?.includes(category)) {
          await guildsService.removeCategoryGuild(newGuild.id, category);
        }
      });

      guild.categories.forEach(async (category) => {
        if (!allGuildCategories?.includes(category)) {
          await guildsService.addCategoryGuild(newGuild.id, category);
        }
      });
    }

    return keysToCamel(data[0]);
  },
  getAllGuildCategories: async (
    guildId: string,
  ): Promise<GuildCategoryEnum[] | undefined> => {
    const { data, error } = await supabase
      .from('guilds_category')
      .select('category_id')
      .eq('guild_id', guildId);

    if (error) {
      return;
    }

    const formatedData: GuildCategoryInterface[] = keysToCamel(data);
    console.log('data getAllGuildCategories', formatedData);

    const categories = formatedData.map((category) => category.categoryId);
    return categories;
  },
  addCategoryGuild: async (
    guildId: string,
    categoryId: GuildCategoryEnum,
  ): Promise<any> => {
    const { data, error } = await supabase.from('guilds_category').insert([
      keysToSnake({
        guildId: guildId,
        categoryId: categoryId,
      }),
    ]);

    if (error) {
      return;
    }
  },
  removeCategoryGuild: async (
    guildId: string,
    categoryId: number,
  ): Promise<any> => {
    const { error } = await supabase
      .from('guilds_category')
      .delete()
      .eq('guild_id', guildId)
      .eq('category_id', categoryId);

    if (error) {
      return;
    }
  },
  removeAllCategoriesGuild: async (guildId: string): Promise<any> => {
    const { error } = await supabase
      .from('guilds_category')
      .delete()
      .eq('guild_id', guildId);

    if (error) {
      return;
    }
  },
  deleteGuild: async (id: string): Promise<void> => {
    guildsService.removeAllCategoriesGuild(id).then(async () => {
      const { error } = await supabase.from('guilds').delete().eq('id', id);

      if (error) {
        return;
      }
    });
  },
  getGuildBackgroundUrl: async (
    guildId: string,
  ): Promise<string | undefined> => {
    const { data, error } = await supabase.storage
      .from('guilds')
      .createSignedUrl(`${guildId}/background`, 3600);

    if (error) {
      console.error(error);
      return;
    }

    return data.signedUrl;
  },
};
