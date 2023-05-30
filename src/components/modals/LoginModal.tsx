import useAuth from "../../hooks/useAuth";
import LoginForm from "../forms/LoginForm"
import Modal from "../utils/Modal"
import React, { FormEvent, useEffect, useState } from "react"


interface Credentials {
  email: string;
  password: string;
}
interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps): JSX.Element => {

  const { session, signIn, error } = useAuth()

  const handleSubmit = (event: FormEvent, { email, password }: Credentials) => {
    event.preventDefault()
    signIn(email, password)
  }

  useEffect(() => {
    if (session.user) {
      onClose()
    }
  }, [session])

  return <Modal onClose={onClose} title="Connexion" >
    <LoginForm onSubmit={handleSubmit} error={error} />
  </Modal>
}

export default LoginModal