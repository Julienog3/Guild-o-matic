import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ProfileType } from '../../interfaces/profile.interface';
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from 'react-query';
import { gw2Service } from '../../services/gw2.service';

interface ProfileFormProps {
  userProfile: ProfileType;
  onSubmit: SubmitHandler<ProfileFormValues>;
}

export type ProfileFormValues = {
  username: string,
  apiKey: string,
};

const ProfileForm = forwardRef(function ProfileForm(
  { userProfile, onSubmit }: ProfileFormProps,
  ref,
): JSX.Element {
  const [isGw2AccountValid, setIsGw2AccountValid] = useState<boolean>(false);

  const profileSchema = z.object({
    username: z.string().min(5, { message: 'Username length too short' }),
    apiKey: z.string().refine(() => isGw2AccountValid === true, {
      message: 'GW2 Account must be valid',
    }),
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile,
  });

  useImperativeHandle(ref, () => ({
    onReset() {
      reset();
    },
  }));

  const {
    status,
    data: playerInformations,
    error: playerInformationsError,
  } = useQuery({
    queryKey: ['account', watch('apiKey')],
    queryFn: () => gw2Service.fetchAccount(watch('apiKey')),
    onSuccess: () => setIsGw2AccountValid(true),
    onError: () => setIsGw2AccountValid(false),
    enabled: !!watch('apiKey'),
  });

  return (
    <form
      id="profile-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        {...register('username')}
        className="bg-main-blue p-4 rounded-lg border border-light-blue text-white w-96 disabled:text-gray"
        type="text"
      />
      {errors.username && errors.username.message}
      <input
        {...register('apiKey')}
        className="bg-main-blue p-4 rounded-lg border border-light-blue text-white w-96 disabled:text-gray"
        type="text"
      />
      {errors.apiKey && errors.apiKey.message}
      {playerInformations && playerInformations.name ? (
        <div className="flex gap-4 p-4 w-96 text-sm text-white items-center rounded-lg bg-green/25 border border-green mb-4">
          <span className="bg-green w-2 h-2 rounded-full" />
          Connecté en tant que {playerInformations.name}
        </div>
      ) : (
        <div className="flex gap-4 p-4 w-96 text-white items-center rounded-lg bg-red/25 border border-red mb-4">
          Compte Guild Wars 2 introuvable
        </div>
      )}

      <button onClick={() => reset()}>Reset</button>
    </form>
  );
});

export default ProfileForm;
