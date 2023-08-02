import useAuth from '../../../hooks/useAuth';
import LoginForm from '../../forms/LoginForm';
import SignUpForm from '../../forms/SignUpForm';
import Modal from '../../utils/Modal';
import React, { FormEvent, useEffect } from 'react';

interface Credentials {
  username: string;
  email: string;
  gw2ApiKey: string;
  password: string;
  repeatedPassword: string;
}

const SignUpModal = (): JSX.Element => {
  const { session, signUp, error } = useAuth();

  const handleSubmit = (event: FormEvent, credentials: Credentials) => {
    event.preventDefault();
    signUp(credentials);
  };

  // useEffect(() => {
  //   if (session.user) {
  //     onClose();
  //   }
  // }, [session]);

  return <SignUpForm onSubmit={handleSubmit} error={error} />;
};

export default SignUpModal;
