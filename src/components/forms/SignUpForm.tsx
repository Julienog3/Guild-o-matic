import React, { useContext, useEffect } from 'react';
import FormError from './FormError';
import { AuthError } from '@supabase/supabase-js';
import { AuthModalTypeEnum } from '../modals/auth/AuthModal';
import { AuthModalContext } from '../../contexts/AuthModalContext';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { gw2Service } from '../../services/gw2.service';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Spinner from '../utils/Spinner';
import { IoMdInformation } from 'react-icons/io';
import { RiInformationLine } from 'react-icons/ri';
import Tooltip from '../utils/Tooltip';
import ApiKeyInstructions from './../../assets/api-key-instructions.mdx';
import { MDXProvider } from '@mdx-js/react';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => void;
  error?: AuthError;
}

type SignUpFormValues = {
  username: string,
  email: string,
  gw2ApiKey: string,
  password: string,
  repeatedPassword: string,
};

const SignUpForm = ({ onSubmit, error }: SignUpFormProps): JSX.Element => {
  const { setType } = useContext(AuthModalContext);

  const signUpSchema = z
    .object({
      username: z.string().min(4, { message: 'Required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      gw2ApiKey: z.optional(z.string()),
      password: z.string().min(7, { message: 'Password too short' }),
      repeatedPassword: z.string(),
    })
    .refine(({ password, repeatedPassword }) => password === repeatedPassword, {
      path: ['repeatedPassword'],
      message: 'Passwords dont match',
    });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  const onSubmitForm = handleSubmit((data) => onSubmit(data));
  const userGw2ApiKey = watch('gw2ApiKey');

  const {
    status,
    data: playerInformations,
    error: playerInformationsError,
    refetch,
  } = useQuery({
    queryKey: ['account', userGw2ApiKey],
    queryFn: () => gw2Service.fetchAccount(userGw2ApiKey),
    enabled: false,
  });

  useEffect(() => {
    if (userGw2ApiKey) {
      refetch();
    }
  }, [userGw2ApiKey]);

  return (
    <form className="flex flex-col gap-8 h-full" onSubmit={onSubmitForm}>
      {/* {error && <FormError>{}</FormError>} */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full">
            <label className="text-light-gray mb-2 text-sm" htmlFor="username">
              Pseudo <span className="text-accent-blue">*</span>
            </label>
            <input
              {...register('username', { required: true })}
              className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue"
              type="text"
              placeholder="Pseudo"
            />
            {errors.username && (
              <div className="text-red text-sm pt-2">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-light-gray mb-2 text-sm" htmlFor="password">
              E-mail <span className="text-accent-blue">*</span>
            </label>
            <input
              {...register('email', { required: true })}
              className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue"
              required
              placeholder="E-mail"
            />
            {errors.email && (
              <div className="text-red text-sm pt-2">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="text-light-gray mb-2 text-sm flex gap-4 items-center"
            htmlFor="password"
          >
            Clé API Guild Wars 2
            <Tooltip
              content={
                <MDXProvider>
                  <ApiKeyInstructions />
                </MDXProvider>
              }
            >
              <span className="bg-bg-blue text-light-gray w-5 h-5 rounded-full flex items-center justify-center">
                ?
              </span>
            </Tooltip>
          </label>
          <input
            {...register('gw2ApiKey')}
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue"
            type="text"
            placeholder="Clé API"
          />
          {playerInformations && playerInformations.id && (
            <div className="flex gap-4 p-4 w-full text-sm mt-4 text-white items-center rounded-lg bg-green/20 border-green border">
              <span className="bg-green w-2 h-2 rounded-full" />
              Connecté en tant que {playerInformations.name}
            </div>
          )}
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full">
            <label className="text-light-gray mb-2 text-sm" htmlFor="password">
              Mot de passe <span className="text-accent-blue">*</span>
            </label>
            <input
              {...register('password', { required: true })}
              className="bg-bg-blue p-4 rounded-lg border border-light-blue text-white text-sm focus:outline-none focus:border-accent-blue"
              type="password"
              placeholder="Mot de passe"
              autoComplete="new-password"
            />
            {errors.password && (
              <div className="text-red text-sm pt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-light-gray mb-2 text-sm" htmlFor="password">
              Vérification mot de passe{' '}
              <span className="text-accent-blue">*</span>
            </label>
            <input
              {...register('repeatedPassword', { required: true })}
              className="bg-bg-blue p-4 text-sm rounded-lg border border-light-blue text-white mb-3 focus:outline-none focus:border-accent-blue"
              type="password"
              placeholder="Mot de passe"
              autoComplete="new-password"
            />
            {errors.repeatedPassword && (
              <div className="text-red text-sm pt-2">
                {errors.repeatedPassword.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <button
          type="submit"
          className="bg-accent-blue flex justify-center items-center rounded-lg p-4 text-sm text-white transition-all hover:bg-accent-blue/75"
        >
          S&apos;inscrire
          {false && <Spinner />}
        </button>
        <p className="text-white text-sm text-center font-raleway">
          Vous avez déjà un compte ?{' '}
          <span
            className="text-accent-blue cursor-pointer"
            onClick={(): void => setType(AuthModalTypeEnum.LOGIN)}
          >
            Se connecter
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
