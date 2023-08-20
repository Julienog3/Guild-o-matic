import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { profilesService } from '../services/profiles.service';
import { useQuery } from 'react-query';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import DisconnectModal from './modals/DisconnectModal';
import useAuth from '../hooks/useAuth';

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps): JSX.Element => {
  const { signOut } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileDropdownToggled, setIsProfileDropdownToggled] =
    useState<boolean>(false);
  const [isDisconnectModalOpened, setIsDisconnectModalOpened] =
    useState<boolean>(false);

  const { data: profile } = useQuery(['profile', userId], () =>
    profilesService.getProfile(userId),
  );

  const handleDisconnect = (): void => {
    signOut();
    navigate('/');
  };

  useEffect(() => {
    console.log('profile', profile);
  }, [profile]);

  useEffect(() => {
    setIsProfileDropdownToggled(false);
  }, [location]);

  return (
    <>
      {isDisconnectModalOpened && (
        <DisconnectModal
          onClose={(): void => setIsDisconnectModalOpened(false)}
          onDisconnect={(): void => handleDisconnect()}
        />
      )}
      {profile && (
        <div className="relative">
          <div
            onClick={() => setIsProfileDropdownToggled((value) => !value)}
            className="cursor-pointer w-fit gap-4 py-2 px-4 border border-light-blue rounded-lg bg-main-blue flex items-center justify-between hover:border-accent-blue transition-colors"
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden w-12 h-12 bg-light-blue">
                {profile.avatarUrl && (
                  <img
                    className="object-cover w-full h-full"
                    src={profile.avatarUrl}
                  />
                )}
              </div>

              <span className="absolute bottom-0 right-0 translate-x-1 border-2 border-main-blue translate-y-1 bg-green w-3 h-3 rounded-full" />
            </div>

            {isProfileDropdownToggled ? (
              <IoIosArrowUp className="text-white text-lg" />
            ) : (
              <IoIosArrowDown className="text-white text-lg" />
            )}
          </div>
          {isProfileDropdownToggled && (
            <div className="absolute z-20 flex flex-col w-full min-w-[250px] right-0 translate-y-4 bg-main-blue border rounded-lg text-white border-light-blue">
              <span className="w-full border-light-blue border-b p-4 text-white font-medium text-md">
                Bonjour {profile.username} 👋
              </span>
              <ul className="w-full border-light-blue text-sm  p-4 text-white text-md flex flex-col gap-4">
                <li>
                  <Link to="/profile">Mon profil</Link>
                </li>
                <li>
                  <Link to="/settings">Préférences</Link>
                </li>
                <li
                  onClick={() => setIsDisconnectModalOpened(true)}
                  className="text-red cursor-pointer"
                >
                  Se déconnecter
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
