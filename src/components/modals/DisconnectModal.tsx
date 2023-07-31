import LoginForm from "../forms/LoginForm"
import Modal from "../utils/Modal"
import React from "react"

interface DisconnectModalProps {
  onClose: () => void
  onDisconnect: () => void
}

const DisconnectModal = ({ onClose, onDisconnect }: DisconnectModalProps): JSX.Element => {
  return <Modal onClose={onClose} title="Déconnexion">
      <p className="text-white text-sm mb-4">Etes vous sûr de vouloir vous déconnecter ?</p>
      <button className="bg-red font-medium text-white p-4 rounded-lg" onClick={(): void => onDisconnect()}>Déconnecter</button>
  </Modal>
}

export default DisconnectModal