import LoginForm from '../forms/LoginForm';
import Modal, { ModalStyle } from '../utils/Modal';
import React from 'react';

interface DisconnectModalProps {
  style: ModalStyle;
  onClose: () => void;
  onDisconnect: () => void;
}

const DisconnectModal = ({
  style,
  onClose,
  onDisconnect,
}: DisconnectModalProps): JSX.Element => {
  return (
    <Modal style={{ ...style }} onClose={onClose} title="Déconnexion">
      <div className="flex flex-col">
        <p className="text-white text-sm mb-6">
          Etes vous sûr de vouloir vous déconnecter ?
        </p>
        <div className="flex gap-4 self-end">
          <button
            className="bg-light-blue text-white p-4 rounded-lg text-sm"
            onClick={(): void => onClose()}
          >
            Annuler
          </button>
          <button
            className="bg-red text-white p-4 rounded-lg text-sm"
            onClick={(): void => onDisconnect()}
          >
            Déconnecter
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DisconnectModal;
