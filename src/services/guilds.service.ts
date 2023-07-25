import { GuildType } from "../interfaces/guild.interface"
import { supabase } from "../supabaseClient"
import { keysToCamel, keysToSnake } from "../utils/helpers"
import { gw2Service } from "./gw2.service"

export const guildsService = {
  getGuilds: async (): Promise<GuildType[] | undefined> => {
    const { data, error } = await supabase
      .from('guilds')
      .select('*')

    if (error) {
      return
    }

    const guilds: GuildType[] = keysToCamel(data)

    return Promise.all(
      guilds.map(async (guild) => {
        const gw2Guild = await gw2Service.getGuildById(guild.guildId).then((gw2Guild) => {
          const KEYS_ALLOWED = ['tag', 'name', 'level', 'memberCapacity', 'memberCount']

          return Object.keys(gw2Guild)
            .filter(key => KEYS_ALLOWED.includes(key))
            .reduce((obj: any, key) => {
              obj[key] = gw2Guild[key];
              return obj;
            }, {});
        })

        return {
          ...guild,
          ...gw2Guild,
        }
      })
    )
  },
  getGuildById: async (id: string): Promise<GuildType | undefined> => {
    const { data, error } = await supabase
      .from('guilds')
      .select('*')
      .eq('id', id)

    if (error) {
      return
    }

    return keysToCamel(data[0])
  },
  getGuildCategoriesById: async (id: number): Promise<any> => {
    const { data, error } = await supabase
      .from('guild_categories')
      .select('categories (name)')
      .eq('id', id)

    if (error) {
      return
    }

    return data
  },
  postGuild: async (guild: any): Promise<any> => {
    const { data, error } = await supabase
      .from('guilds')
      .insert([keysToSnake(guild)])

      if (error) {
        return
      }

      console.log(data)
  }
}