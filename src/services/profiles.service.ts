import { supabase } from "../supabaseClient"
import { keysToCamel, keysToSnake } from "../utils/helpers"

export const profilesService = {
  postProfile: async (user: any): Promise<any> => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(keysToSnake(user))

    if (error) {
        return
      }

    console.log(data)
  },
}