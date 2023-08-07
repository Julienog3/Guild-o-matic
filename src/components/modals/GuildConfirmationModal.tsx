import Modal from '../utils/Modal';
import React from 'react';

interface GuildConfirmationModalProps {
  onClose: () => void;
  onConfirmation: () => void;
}

const GuildConfirmationModal = ({
  onClose,
  onConfirmation,
}: GuildConfirmationModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} title="Ajout de guilde">
      <div className="flex flex-col">
        <p className="text-white mb-6">
          Etes vous sûr de vouloir vouloir ajouter cette guilde ?
        </p>
        <div className="flex gap-4 self-end">
          <button
            className="bg-light-blue text-white p-4 rounded-lg"
            onClick={(): void => onClose()}
          >
            Annuler
          </button>
          <button
            className="bg-accent-blue text-white p-4 rounded-lg"
            onClick={(): void => onConfirmation()}
          >
            Publier
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GuildConfirmationModal;
