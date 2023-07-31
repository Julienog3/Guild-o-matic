import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { supabase } from '../supabaseClient';
import { keysToCamel } from '../utils/helpers';

const usePlayer = () => {
  const { session } = useAuth();

  const [player, setPlayer] = useState<any>();
  const [profile, setProfile] = useState<any>();

  const { apiKey } = profile ?? '';

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session?.user.id);

      if (error) {
        return;
      }

      const formattedData = keysToCamel(data);
      setProfile(formattedData[0]);
    };

    getProfile();
  }, [session]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    const getPlayer = async (apiKey: string) => {
      await fetch(
        `${import.meta.env.VITE_GW2_API_URL}/v2/account?access_token=${apiKey}`,
        {
          method: 'GET',
        },
      )
        .then((res) => res.json())
        .then((data) => keysToCamel(data))
        .then((formattedData) => setPlayer(formattedData));
    };

    if (profile.apiKey) {
      getPlayer(profile.apiKey);
    }
  }, [profile]);

  return { player, apiKey };
};

export default usePlayer;
