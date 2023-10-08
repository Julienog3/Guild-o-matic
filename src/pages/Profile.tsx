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

  type ProfileFormHandle = React.ElementRef<typeof ProfileForm>;

  const profileFormRef = useRef<ProfileFormHandle>(null);

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    if (!session?.user) return;

    profilesService.updateProfile(session?.user.id, data);
  };

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', session?.user.id],
    queryFn: () => session && profilesService.getProfile(session.user.id),
    enabled: !!session,
  });

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
                  onClick={(): void => {
                    profileFormRef?.current?.onReset();
                  }}
                  className=" bg-gray/25 border border-gray text-white p-4 rounded-lg w-fit text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  disabled={!isEdited}
                  className={`${
                    isEdited ? 'bg-accent-blue ' : 'bg-accent-blue/25'
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
