import React, { useContext, useEffect, useState } from 'react';
import Page from '../components/layout/Page';
import useAuth from '../hooks/useAuth';
import { supabase } from '../supabaseClient';
import { keysToCamel } from '../utils/helpers';
import DisconnectModal from '../components/modals/DisconnectModal';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import { NotificationContext } from '../contexts/NotificationContext';
import { NotificationEnum } from '../interfaces/notification.interface';

const Profile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<any>();
  const [playerInformations, setPlayerInformations] = useState<any>();

  const { session } = useAuth();

  const [userApiKey, setUserApiKey] = useState<string>('');
  const [isApiKeyEditing, setIsApiKeyEditing] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setSelectedAvatar(e.target.files[0]);
  };

  const uploadAvatar = async (avatar: File) => {
    const { error } = await supabase.storage
      .from('users')
      .upload(`${session?.user.id}/avatar`, avatar, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      setNotifications([
        ...notifications,
        {
          type: NotificationEnum.DANGER,
          message: error.message,
        },
      ]);
    }
  };

  useEffect(() => {
    if (!selectedAvatar) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  useEffect(() => {
    if (!session?.user) {
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
      console.log(formattedData);
      setUserProfile(formattedData[0]);
    };

    const getAvatar = async () => {
      const { data, error } = await supabase.storage
        .from('users')
        .createSignedUrl(`${session.user.id}/avatar`, 3600);

      if (error) {
        console.error(error);
        return;
      }

      setUserAvatarUrl(data.signedUrl);
    };

    getProfile();
    getAvatar();
  }, [session]);

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    setUserApiKey(userProfile.apiKey);
  }, [userProfile]);

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
      {userProfile && (
        <Page>
          <div className="max-w-7xl mx-auto mb-8 flex flex-col">
            <div className="w-full flex gap-4 items-end border-b border-light-blue mb-4 pb-4">
              <img
                className="w-32 h-32 rounded-lg object-cover"
                src={userAvatarUrl}
                alt=""
              />
              <h2 className="text-3xl font-raleway font-semibold text-white mb-4">
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
            <div className="flex items-center justify-center w-96 flex-col gap-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-light-blue border-dashed rounded-lg cursor-pointer bg-main-blue"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {preview ? (
                    <img
                      className=" w-28 overflow-hidden rounded-lg mb-4"
                      src={preview}
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 mb-4 text-white dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  )}
                  <p className="mb-2 text-white dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-white">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleAvatarChange(e)
                  }
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                />
              </label>
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
          </div>
        </Page>
      )}
    </>
  );
};

export default Profile;
