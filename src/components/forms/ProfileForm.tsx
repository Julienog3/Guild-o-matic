import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { ProfileType } from '../../interfaces/profile.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from 'react-query';
import { gw2Service } from '../../services/gw2.service';

interface ProfileFormProps {
  userProfile: ProfileType;
  onSubmit: SubmitHandler<ProfileFormValues>;
  onEdited: (isEdited: boolean) => void;
}

export type ProfileFormHandle = {
  onReset: () => void,
};

export type ProfileFormValues = {
  username: string,
  apiKey: string,
  profilePicture: FileList,
};

const ProfileForm = forwardRef<ProfileFormHandle, ProfileFormProps>(
  function ProfileForm({ userProfile, onSubmit, onEdited }, ref): JSX.Element {
    const [isGw2AccountValid, setIsGw2AccountValid] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>();

    const profileSchema = z.object({
      username: z.string().min(5, { message: 'Username length too short' }),
      apiKey: z.string().refine(() => isGw2AccountValid === true, {
        message: 'GW2 Account must be valid',
      }),
      profilePicture: z.any().optional(),
      // .refine((files) => files?.length == 1, 'Image is required.'),
    });

    const {
      register,
      formState: { errors, isDirty },
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

    useEffect(() => {
      onEdited(isDirty);
    }, [isDirty]);

    const {
      status,
      data: playerInformations,
      error: playerInformationsError,
    } = useQuery({
      queryKey: ['account', watch('apiKey')],
      queryFn: () => gw2Service.fetchAccount(watch('apiKey')),
      enabled: !!watch('apiKey'),
    });

    useEffect(() => {
      const profilePicture = watch('profilePicture')[0];

      if (!profilePicture) {
        setPreview(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(profilePicture);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }, [watch('profilePicture')]);

    useEffect(() => {
      setIsGw2AccountValid(!!playerInformations?.name);
    }, [playerInformations]);

    return (
      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            Pseudo
          </label>
          <input
            {...register('username')}
            placeholder="Pseudo"
            className="bg-main-blue text-sm p-4 rounded-lg border border-light-blue text-white w-96 disabled:text-gray focus:outline-none focus:border-accent-blue"
            type="text"
          />
          {errors.username && (
            <span className="text-red text-sm pt-2">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            Clé API Guild Wars 2
          </label>
          <input
            {...register('apiKey')}
            className="bg-main-blue text-sm p-4 rounded-lg border border-light-blue text-white w-96 disabled:text-gray"
            type="text"
          />
          {errors.apiKey && (
            <span className="text-red text-sm">{errors.apiKey.message}</span>
          )}
        </div>
        {playerInformations && playerInformations.name ? (
          <div className="flex gap-4 p-4 w-96 text-sm text-white items-center rounded-lg bg-green/25 border border-green mb-4">
            <span className="bg-green w-2 h-2 rounded-full" />
            Connecté en tant que {playerInformations.name}
          </div>
        ) : (
          <div className="flex gap-4 p-4 w-96 text-sm text-white items-center rounded-lg bg-red/25 border border-red mb-4">
            Compte Guild Wars 2 introuvable
          </div>
        )}
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            Photo de profil
          </label>
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
                <p className="mb-2 text-white text-sm dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-white">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                {...register('profilePicture')}
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
              />
            </label>
            {errors.profilePicture && (
              <span className="text-red text-sm">
                {errors.profilePicture.message}
              </span>
            )}
          </div>
        </div>
      </form>
    );
  },
);

export default ProfileForm;
