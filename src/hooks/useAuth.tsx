import { useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { AuthError, Session } from '@supabase/supabase-js';
import { AuthContext } from '../contexts/AuthContext';
import { profilesService } from '../services/profiles.service';
import { useQuery } from 'react-query';
import { authService } from '../services/auth.service';

const useAuth = () => {
  const [error, setError] = useState<AuthError>();

  const { data: session, refetch } = useQuery(
    'session',
    authService.getSession,
  );

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
    }

    refetch();
  };

  const signUp = async (credentials: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      setError(error);
    }

    if (data.user) {
      await profilesService.postProfile({
        userId: data.user.id,
        username: credentials.username,
        apiKey: credentials.gw2ApiKey,
      });
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return setError(error);
    }

    refetch();
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://127.0.0.1:5173/',
    });

    if (error) {
      return setError(error);
    }
  };

  return { session, error, signIn, signUp, signOut, resetPassword };
};

export default useAuth;
