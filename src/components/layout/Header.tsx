import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile';
import { FaBell } from 'react-icons/fa';
import LoginModal from '../modals/LoginModal';
import useAuth from '../../hooks/useAuth';
import { supabase } from '../../supabaseClient';
import { keysToCamel } from '../../utils/helpers';
import SignUpModal from '../modals/SignUpModal';

const Header = (): JSX.Element => {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
  const [toggleSignUpModal, setToggleSignUpModal] = useState<boolean>(false);

  const [profile, setProfile] = useState<any>();

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
      {toggleLoginModal && (
        <LoginModal
          onClose={() => {
            setToggleLoginModal(false);
          }}
        />
      )}
      {toggleSignUpModal && (
        <SignUpModal
          onClose={() => {
            setToggleSignUpModal(false);
          }}
        />
      )}
      <header className="z-10 max-w-7xl w-full mx-auto p-8 pb-0 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white font-semibold font-raleway text-3xl ">
            Guild-o-matic
          </h1>
        </Link>
        <div className="flex gap-4">
          {profile && (
            <div className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
              <FaBell className="text-white text-lg" />
            </div>
          )}
          {profile && <Profile profile={profile} />}
        </div>
      </header>
    </>
  );
};

export default Header;
