import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import useAuth from '../../hooks/useAuth';
import FormError from './FormError';
import { AuthError } from '@supabase/supabase-js';
import { AuthModalContext } from '../../contexts/AuthModalContext';
import { AuthModalTypeEnum } from '../modals/auth/AuthModal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  error?: AuthError;
}

type LoginFormValues = {
  email: string,
  password: string,
};

interface Credentials {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit, error }: LoginFormProps): JSX.Element => {
  const LoginSchema = z.object({
    email: z.string().email({ message: 'Should be an email' }),
    password: z
      .string()
      .min(7, { message: 'Password should have a least 7 letters' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmitForm = handleSubmit((data) => onSubmit(data));

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  const { setType } = useContext(AuthModalContext);

  return (
    <form className="flex flex-col gap-8 h-full" onSubmit={onSubmitForm}>
      {error && <FormError>{error.message}</FormError>}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            E-mail
          </label>
          <input
            {...register('email', { required: true })}
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue"
            placeholder="E-mail"
          />
          {errors.email && (
            <div className="text-red text-sm pt-2">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            Mot de passe
          </label>
          <div className="flex flex-col w-full">
            <input
              className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue mb-3"
              {...register('password', { required: true })}
              placeholder="Mot de passe"
              type="password"
            />
          </div>
          {errors.password && (
            <div className="text-red text-sm pt-2">
              {errors.password.message}
            </div>
          )}
          <span
            className="text-accent-blue self-end text-sm cursor-pointer"
            onClick={(): void => setType(AuthModalTypeEnum.RESET_PASSWORD)}
          >
            Mot de passe oublié ?
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <button
          type="submit"
          className="bg-accent-blue rounded-lg p-4 text-sm text-white transition-all hover:bg-accent-blue/75"
        >
          Se connecter
        </button>
        <p className="text-white text-center text-sm">
          Vous n&apos;avez pas de compte ?{' '}
          <span
            className="text-accent-blue cursor-pointer"
            onClick={(): void => setType(AuthModalTypeEnum.SIGN_UP)}
          >
            S&apos;inscrire
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
