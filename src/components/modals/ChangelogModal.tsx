import { MDXProvider } from '@mdx-js/react';
import LoginForm from '../forms/LoginForm';
import Changelog from '../../assets/changelog.mdx';
import Modal from '../utils/Modal';
import React from 'react';

interface ChangelogModalProps {
  onClose: () => void;
  // onDisconnect: () => void;
}

const ChangelogModal = ({
  onClose, // onDisconnect,
}: ChangelogModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} title="Changelog">
      <div className="flex flex-col">
        <div className="h-96 overflow-y-scroll pr-4 mb-4 prose text-light-gray prose-code:p-1 prose-code:rounded prose-a:text-accent-blue prose-code:bg-light-blue prose-code:text-white prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
          <MDXProvider>
            <Changelog />
          </MDXProvider>
        </div>
        <div className="flex gap-4 self-end">
          <button
            className="bg-light-blue text-white p-4 rounded-lg"
            onClick={(): void => onClose()}
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangelogModal;
