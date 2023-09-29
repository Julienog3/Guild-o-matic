import React, { forwardRef, useImperativeHandle } from 'react';
import { ProfileType } from '../../interfaces/profile.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  const profileSchema = z.object({
    username: z.string().min(5, { message: 'Username length too short' }),
    apiKey: z.string(),
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile,
  });

  useImperativeHandle(ref, () => ({
    onReset() {
      reset();
    },
  }));

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
    </form>
  );
});

export default ProfileForm;
