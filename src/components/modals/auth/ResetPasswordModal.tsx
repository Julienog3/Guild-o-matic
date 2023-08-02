import useAuth from '../../../hooks/useAuth';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import React, { FormEvent, useEffect, useState } from 'react';

interface Credentials {
  email: string;
  password: string;
}
const ResetPasswordModal = (): JSX.Element => {
  const { resetPassword, error } = useAuth();

  const handleSubmit = (event: FormEvent, { email }: Credentials) => {
    event.preventDefault();
    resetPassword(email);
  };

  return <ResetPasswordForm onSubmit={handleSubmit} error={error} />;
};

export default ResetPasswordModal;
