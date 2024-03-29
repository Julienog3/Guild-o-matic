import Modal from '../../utils/Modal/Modal';
import React, { FormEvent, useContext, useEffect } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { AuthModalContext } from '../../../contexts/AuthModalContext';
import ResetPasswordModal from './ResetPasswordModal';
import SignUpConfirmationModal from './SignupConfirmationModal';
import { useTransition } from '@react-spring/web';

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

  const transition = useTransition(isOpen, {
    from: {
      y: 0,
      opacity: 0,
    },
    enter: {
      y: -10,
      opacity: 1,
    },
    leave: {
      y: 0,
      opacity: 0,
    },
    config: {
      duration: 200,
    },
  });

  const modal = modalContents.find(
    (modalContent) => modalContent.type === type,
  );

  return (
    <>
      {transition((style, isOpen) => (
        <>
          {isOpen && (
            <Modal style={style} onClose={onClose} title={modal?.title}>
              {modal?.component}
            </Modal>
          )}
        </>
      ))}
    </>
  );
};

export default AuthModal;
