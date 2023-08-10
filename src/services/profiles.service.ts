import { ProfileType } from '../interfaces/profile.interface';
import { supabase } from '../supabaseClient';
import { keysToCamel, keysToSnake } from '../utils/helpers';

export const profilesService = {
  getProfile: async (userId: string): Promise<ProfileType> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error("Can't fetch user profile");
    }

    const userAvatar = await profilesService.getUserAvatar(userId);

    const formattedData = {
      ...keysToCamel(data[0]),
      avatarUrl: userAvatar,
    };
    return formattedData;
  },
  postProfile: async (user: any): Promise<any> => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(keysToSnake(user));

    if (error) {
      console.error(error);
      return;
    }
  },
  getUserAvatar: async (userId: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('users')
      .createSignedUrl(`${userId}/avatar`, 3600);

    if (error) {
      throw new Error("Can't fetch user avatar");
    }

    return data.signedUrl;
  },
  uploadUserAvatar: async (userId: string, file: File): Promise<void> => {
    const { error } = await supabase.storage
      .from('users')
      .upload(`${userId}/avatar`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error("Can't upload user avatar");
    }
  },
};
