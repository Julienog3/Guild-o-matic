import React, { useEffect, useState } from 'react';
import Page from '../components/layout/Page';
import useAuth from '../hooks/useAuth';
import { supabase } from '../supabaseClient';
import { keysToCamel } from '../utils/helpers';
import DisconnectModal from '../components/modals/DisconnectModal';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

const Profile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<any>();
  const [playerInformations, setPlayerInformations] = useState<any>();
  const [isDisconnectModalOpened, setIsDisconnectModalOpened] =
    useState<boolean>(false);

  const { session, signOut } = useAuth();

  const [userApiKey, setUserApiKey] = useState<string>('');
  const [isApiKeyEditing, setIsApiKeyEditing] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File>();

  const navigate = useNavigate();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setSelectedAvatar(e.target.files[0]);
  };

  const uploadAvatar = async (avatar: File) => {
    const { data, error } = await supabase.storage
      .from('users')
      .upload(`${session.user.id}/avatar`, avatar);

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };

  useEffect(() => {
    if (!session.user) {
      return setUserProfile(undefined);
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
      setUserProfile(formattedData[0]);
    };

    getProfile();
  }, [session]);

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    setUserApiKey(userProfile.apiKey);
  }, [userProfile]);

  const handleDisconnect = (): void => {
    signOut();
    navigate('/');
  };

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    const getAccount = async () => {
      await fetch(
        `${
          import.meta.env.VITE_GW2_API_URL
        }/v2/account?access_token=${userApiKey}`,
        {
          method: 'GET',
        },
      )
        .then((res) => res.json())
        .then((data) => setPlayerInformations(data));
    };

    getAccount();
  }, [userApiKey]);

  return (
    <>
      {isDisconnectModalOpened && (
        <DisconnectModal
          onClose={(): void => setIsDisconnectModalOpened(false)}
          onDisconnect={(): void => handleDisconnect()}
        />
      )}
      {userProfile && (
        <Page>
          <div className="max-w-7xl mx-auto mb-8 flex flex-col">
            <div className="w-full border-b border-light-blue mb-4">
              <h2 className="text-4xl font-raleway font-semibold text-white mb-4">
                Profil de {userProfile.username}
              </h2>
            </div>
            <div className="flex flex-col text-md mb-4">
              <label className="text-light-gray mb-2 text-md" htmlFor="">
                Clé api
              </label>
              <div className="flex gap-4">
                <input
                  className="bg-main-blue p-4 rounded-lg border border-light-blue text-white w-96 disabled:text-gray"
                  type="text"
                  disabled={!isApiKeyEditing}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setUserApiKey(e.target.value)
                  }
                  value={userApiKey}
                />
                <button
                  onClick={(): void => setIsApiKeyEditing(!isApiKeyEditing)}
                  className={`${
                    isApiKeyEditing ? 'bg-accent-blue' : 'bg-main-blue'
                  } flex items-center justify-center w-14 rounded-lg border border-light-blue text-white`}
                >
                  {isApiKeyEditing ? (
                    <BsCheckLg className="text-2xl" />
                  ) : (
                    <FaPen />
                  )}
                </button>
              </div>
            </div>
            {playerInformations && playerInformations.name ? (
              <div className="flex gap-4 p-4 w-96 text-white items-center rounded-lg bg-green/25 border border-green mb-4">
                <span className="bg-green w-2 h-2 rounded-full" />
                Connecté en tant que {playerInformations.name}
              </div>
            ) : (
              <div className="flex gap-4 p-4 w-96 text-white items-center rounded-lg bg-red/25 border border-red mb-4">
                Compte Guild Wars 2 introuvable
              </div>
            )}
            <div className="flex gap-4">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleAvatarChange(e)
                }
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <button
                className="bg-accent-blue/25 border border-accent-blue font-medium text-white p-4 rounded-lg w-fit"
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ): void => {
                  e.preventDefault();

                  if (!selectedAvatar) {
                    return;
                  }

                  uploadAvatar(selectedAvatar);
                }}
              >
                Upload avatar
              </button>
            </div>

            <button
              className="bg-red/25 border border-red font-medium text-white p-4 rounded-lg w-fit"
              onClick={(): void => setIsDisconnectModalOpened(true)}
            >
              Déconnecter
            </button>
          </div>
        </Page>
      )}
    </>
  );
};

export default Profile;
