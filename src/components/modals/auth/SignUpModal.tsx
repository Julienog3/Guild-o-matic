import { AuthModalContext } from '../../../contexts/AuthModalContext';
import useAuth from '../../../hooks/useAuth';
import LoginForm from '../../forms/LoginForm';
import SignUpForm from '../../forms/SignUpForm';
import Modal from '../../utils/Modal';
import React, { FormEvent, useContext, useEffect } from 'react';
import { AuthModalTypeEnum } from './AuthModal';

interface Credentials {
  username: string;
  email: string;
  gw2ApiKey: string;
  password: string;
  repeatedPassword: string;
}

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal = ({ onClose }: SignUpModalProps): JSX.Element => {
  const { session, signUp, error } = useAuth();
  const { setType, setSignUpEmail } = useContext(AuthModalContext);

  const handleSubmit = (credentials: Credentials) => {
    signUp(credentials);
    setSignUpEmail(credentials.email);
    setType(AuthModalTypeEnum.SIGN_UP_CONFIRMATION);
  };

  useEffect(() => {
    if (session?.user) {
      onClose();
    }
  }, [session]);

  return <SignUpForm onSubmit={handleSubmit} error={error} />;
};

export default SignUpModal;
