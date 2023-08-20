import Modal from '../../utils/Modal';
import React, { FormEvent, useContext, useEffect } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { AuthModalContext } from '../../../contexts/AuthModalContext';
import ResetPasswordModal from './ResetPasswordModal';
import SignUpConfirmationModal from './SignupConfirmationModal';

interface AuthModalProps {
  onClose: () => void;
}

export enum AuthModalTypeEnum {
  RESET_PASSWORD = 'resetPassword',
  LOGIN = 'login',
  SIGN_UP = 'signUp',
  SIGN_UP_CONFIRMATION = 'signUpConfirmation',
}

const AuthModal = ({ onClose }: AuthModalProps): JSX.Element => {
  const { isOpen, type } = useContext(AuthModalContext);

  const modalContents = [
    {
      type: AuthModalTypeEnum.RESET_PASSWORD,
      title: 'Réinitialisation du mot de passe',
      component: <ResetPasswordModal />,
    },
    {
      type: AuthModalTypeEnum.LOGIN,
      title: 'Connexion',
      component: <LoginModal onClose={onClose} />,
    },
    {
      type: AuthModalTypeEnum.SIGN_UP,
      title: 'Inscription',
      component: <SignUpModal onClose={onClose} />,
    },
    {
      type: AuthModalTypeEnum.SIGN_UP_CONFIRMATION,
      title: 'Confirmation',
      component: <SignUpConfirmationModal onClose={onClose} />,
    },
  ];

  const modal = modalContents.find(
    (modalContent) => modalContent.type === type,
  );

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose} title={modal?.title}>
          {modal?.component}
        </Modal>
      )}
    </>
  );
};

export default AuthModal;
