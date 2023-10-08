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
      ...(userAvatar && { avatarUrl: userAvatar }),
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
  updateProfile: async (id: string, userPayload: any): Promise<any> => {
    const { profilePicture, ...otherData } = userPayload;

    const { data, error } = await supabase
      .from('profiles')
      .update(keysToSnake(otherData))
      .eq('user_id', id)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    if (profilePicture[0]) {
      profilesService.uploadUserAvatar(id, profilePicture[0]);
    }
  },
  getUserAvatar: async (userId: string): Promise<string | undefined> => {
    const { data, error } = await supabase.storage
      .from('users')
      .createSignedUrl(`${userId}/avatar`, 3600);

    if (error) {
      return;
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
