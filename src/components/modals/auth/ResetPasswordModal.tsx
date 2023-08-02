import useAuth from '../../../hooks/useAuth';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import React, { FormEvent, useEffect, useState } from 'react';

interface Credentials {
  email: string;
  password: string;
}
const ResetPasswordModal = (): JSX.Element => {
  const { session, signIn, error } = useAuth();

  const handleSubmit = (event: FormEvent, { email, password }: Credentials) => {
    event.preventDefault();
    // signIn(email, password);
  };

  return <ResetPasswordForm onSubmit={handleSubmit} error={error} />;
};

export default ResetPasswordModal;
