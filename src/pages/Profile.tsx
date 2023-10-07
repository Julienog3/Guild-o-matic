import React, { useContext, useEffect, useRef, useState } from 'react';
import Page from '../components/layout/Page';
import useAuth from '../hooks/useAuth';
import { supabase } from '../supabaseClient';
import { FaPen } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import { NotificationContext } from '../contexts/NotificationContext';
import { NotificationEnum } from '../interfaces/notification.interface';
import { useQuery } from 'react-query';
import { profilesService } from '../services/profiles.service';
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form';
import ProfileForm, {
  ProfileFormValues,
} from '../components/forms/ProfileForm';

const Profile = (): JSX.Element => {
  const { session } = useAuth();

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [isApiKeyEditing, setIsApiKeyEditing] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { notifications, setNotifications } = useContext(NotificationContext);

  const profileFormRef = useRef();

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    if (!session?.user) return;

    console.log('data', data);

    const { profilePicture, ...others } = data;

    profilesService.uploadUserAvatar(session?.user.id, profilePicture[0]);
    // profilesService.updateProfile(session?.user.id, others);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setSelectedAvatar(e.target.files[0]);
  };

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', session?.user.id],
    queryFn: () => session && profilesService.getProfile(session.user.id),
    enabled: !!session,
  });

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

  const handleSubmit = (reset: UseFormReset<ProfileFormValues>) => {
    reset();
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

  return (
    <>
      {userProfile && (
        <Page>
          <div className="max-w-7xl mx-auto mb-8 flex flex-col">
            <div className="w-full flex justify-between mb-4 pb-4 border-b border-light-blue">
              <div className="flex gap-4 items-end ">
                {userProfile.avatarUrl && (
                  <img
                    className="w-32 h-32 rounded-lg object-cover"
                    src={userProfile.avatarUrl}
                    alt=""
                  />
                )}
                <h2 className="text-3xl font-raleway font-semibold text-white">
                  Profil de {userProfile.username}
                </h2>
              </div>
              <div className="flex gap-4 self-end">
                <button
                  onClick={(): void => profileFormRef?.current?.onReset()}
                  className=" bg-gray/25 border border-gray text-white p-4 rounded-lg w-fit text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  disabled={!isEdited}
                  className={`${
                    isEdited ? 'bg-accent-blue' : 'bg-light-blue'
                  } text-white p-4 rounded-lg w-fit text-sm`}
                >
                  Enregistrer
                </button>
              </div>
            </div>
            <ProfileForm
              ref={profileFormRef}
              userProfile={userProfile}
              onSubmit={onSubmit}
              onEdited={(isFormEdited) => setIsEdited(isFormEdited)}
            />
          </div>
        </Page>
      )}
    </>
  );
};

export default Profile;
