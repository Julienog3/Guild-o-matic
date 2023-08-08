import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import useAuth from '../../hooks/useAuth';
import FormError from './FormError';
import { AuthError } from '@supabase/supabase-js';
import { AuthModalContext } from '../../contexts/AuthModalContext';
import { AuthModalTypeEnum } from '../modals/auth/AuthModal';
import { AiFillEye } from 'react-icons/ai';

interface LoginFormProps {
  onSubmit: (event: FormEvent, credentials: Credentials) => void;
  error?: AuthError;
}

interface Credentials {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit, error }: LoginFormProps): JSX.Element => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  const { setType } = useContext(AuthModalContext);

  return (
    <form
      className="flex flex-col gap-8 h-full"
      onSubmit={(e: FormEvent) => onSubmit(e, credentials)}
    >
      {error && <FormError>{error.message}</FormError>}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            E-mail
          </label>
          <input
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue"
            value={credentials.email}
            required
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                email: e.target.value,
              }))
            }
            type="email"
            placeholder="E-mail"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue mb-3"
            value={credentials.password}
            required
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                password: e.target.value,
              }))
            }
            type={isPasswordRevealed ? 'text' : 'password'}
            placeholder="Mot de passe"
          />
          <button
            className="bg-red text-white p-4 rounded-md"
            onClick={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ): void => {
              e.preventDefault();
              setIsPasswordRevealed(!isPasswordRevealed);
            }}
          >
            <AiFillEye />
          </button>
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
