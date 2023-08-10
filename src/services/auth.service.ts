import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export const authService = {
  getSession: async (): Promise<Session | undefined> => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return;
    }

    if (!data.session) {
      return;
    }

    return data.session;
  },
};
