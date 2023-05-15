import LoginForm from "../forms/LoginForm"
import Modal from "../utils/Modal"
import React from "react"

interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps): JSX.Element => {
  return <Modal onClose={onClose} title="Connexion" >
    <LoginForm />
  </Modal>
}

export default LoginModal