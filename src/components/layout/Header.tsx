import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile';
import { FaBell } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { supabase } from '../../supabaseClient';
import { keysToCamel } from '../../utils/helpers';
import { AuthModalTypeEnum } from '../modals/auth/AuthModal';
import { AuthModalContext } from '../../contexts/AuthModalContext';

const Header = (): JSX.Element => {
  const [profile, setProfile] = useState<any>();
  const { setType, setIsOpen } = useContext(AuthModalContext);

  const { session } = useAuth();

  useEffect(() => {
    if (!session.user) {
      return setProfile(undefined);
    }

    const getProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        return;
      }

      const formattedData = keysToCamel(data);
      setProfile(formattedData[0]);
    };

    getProfile();
  }, [session]);

  return (
    <>
      <header className="z-10 max-w-7xl w-full mx-auto pb-0 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white font-semibold text-3xl">Guild-o-matic</h1>
        </Link>
        <div className="flex gap-4">
          {profile && (
            <div className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
              <FaBell className="text-white text-lg" />
            </div>
          )}

          {profile ? (
            <Profile profile={profile} />
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setType(AuthModalTypeEnum.LOGIN);
                  setIsOpen(true);
                }}
                className="rounded-lg bg-main-blue border-light-blue border px-6 py-4 text-white w-fit text-sm"
              >
                Se connecter
              </button>
              <button
                type="button"
                onClick={() => {
                  setType(AuthModalTypeEnum.SIGN_UP);
                  setIsOpen(true);
                }}
                className="rounded-lg bg-accent-blue px-6 py-4 text-white w-fit text-sm"
              >
                S&apos;inscrire
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
