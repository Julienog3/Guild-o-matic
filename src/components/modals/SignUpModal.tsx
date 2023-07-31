import useAuth from "../../hooks/useAuth";
import LoginForm from "../forms/LoginForm"
import SignUpForm from "../forms/SignUpForm";
import Modal from "../utils/Modal"
import React, { FormEvent, useEffect, useState } from "react"


interface Credentials {
  username: string;
  email: string;
  gw2ApiKey: string;
  password: string;
  repeatedPassword: string;
}
interface SignUpModalProps {
  onClose: () => void
}

const SignUpModal = ({ onClose }: SignUpModalProps): JSX.Element => {
  const { session, signUp, error } = useAuth()

  const handleSubmit = (event: FormEvent, credentials: Credentials) => {
    event.preventDefault()
    signUp(credentials)
  }

  useEffect(() => {
    if (session.user) {
      onClose()
    }
  }, [session])

  return <Modal onClose={onClose} title="Inscription" >
    <SignUpForm onSubmit={handleSubmit} error={error} />
  </Modal>
}

export default SignUpModal