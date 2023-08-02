import useAuth from '../../../hooks/useAuth';
import LoginForm from '../../forms/LoginForm';
import Modal from '../../utils/Modal';
import React, { FormEvent, useEffect, useState } from 'react';

interface Credentials {
  email: string;
  password: string;
}
const LoginModal = (): JSX.Element => {
  const { session, signIn, error } = useAuth();

  const handleSubmit = (event: FormEvent, { email, password }: Credentials) => {
    event.preventDefault();
    signIn(email, password);
  };

  // useEffect(() => {
  //   if (session.user) {
  //     onClose();
  //   }
  // }, [session]);

  return <LoginForm onSubmit={handleSubmit} error={error} />;
};

export default LoginModal;
