import LoginForm from '../forms/LoginForm';
import Modal from '../utils/Modal';
import React from 'react';

interface DisconnectModalProps {
  onClose: () => void;
  onDisconnect: () => void;
}

const GuildConfirmationModal = ({
  onClose,
  onDisconnect,
}: DisconnectModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} title="Déconnexion">
      <div className="flex flex-col">
        <p className="text-white mb-6">
          Etes vous sûr de vouloir vous déconnecter ?
        </p>
        <div className="flex gap-4 self-end">
          <button
            className="bg-light-blue text-white p-4 rounded-lg"
            onClick={(): void => onClose()}
          >
            Annuler
          </button>
          <button
            className="bg-red text-white p-4 rounded-lg"
            onClick={(): void => onDisconnect()}
          >
            Déconnecter
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GuildConfirmationModal;
