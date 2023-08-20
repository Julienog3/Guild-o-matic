import { AuthModalContext } from '../../../contexts/AuthModalContext';
import useAuth from '../../../hooks/useAuth';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

interface SignUpConfirmationModalProps {
  onClose: () => void;
}
const SignUpConfirmationModal = ({
  onClose,
}: SignUpConfirmationModalProps): JSX.Element => {
  const { signUpEmail } = useContext(AuthModalContext);

  return (
    <div className="flex flex-col max-w-[500px]">
      <p className="text-light-gray">
        Un email a été envoyé à l&apos;adresse mail{' '}
        <span className=" font-semibold text-white">{signUpEmail}</span> avec un
        lien de confirmation.
      </p>
    </div>
  );
};

export default SignUpConfirmationModal;
