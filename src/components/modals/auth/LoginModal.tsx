import useAuth from '../../../hooks/useAuth';
import LoginForm from '../../forms/LoginForm';
import React, { FormEvent, useEffect } from 'react';

interface Credentials {
  email: string;
  password: string;
}

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps): JSX.Element => {
  const { session, signIn, error } = useAuth();

  const handleSubmit = ({ email, password }: Credentials) => {
    signIn(email, password);
  };

  useEffect(() => {
    if (session?.user) {
      onClose();
    }
  }, [session]);

  return <LoginForm onSubmit={handleSubmit} error={error} />;
};

export default LoginModal;
