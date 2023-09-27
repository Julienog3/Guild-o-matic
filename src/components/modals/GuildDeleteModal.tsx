import Modal, { ModalStyle } from '../utils/Modal';
import React from 'react';

interface GuildDeleteModalProps {
  style: ModalStyle;
  onClose: () => void;
  onDelete: () => void;
}

const GuildDeleteModal = ({
  style,
  onClose,
  onDelete,
}: GuildDeleteModalProps): JSX.Element => {
  return (
    <Modal style={{ ...style }} onClose={onClose} title="Supprimer la guilde ">
      <div className="flex flex-col">
        <p className="text-white mb-6">
          Etes vous sûr de vouloir vous supprimer la guilde ?
        </p>
        <div className="flex gap-4 self-end">
          <button
            className="bg-light-blue text-white text-sm p-4 rounded-lg"
            onClick={(): void => onClose()}
          >
            Annuler
          </button>
          <button
            className="bg-red text-white text-sm p-4 rounded-lg"
            onClick={(): void => onDelete()}
          >
            Supprimer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GuildDeleteModal;
