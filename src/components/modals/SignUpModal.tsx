import useAuth from "../../hooks/useAuth";
import LoginForm from "../forms/LoginForm"
import SignUpForm from "../forms/SignUpForm";
import Modal from "../utils/Modal"
import React, { FormEvent, useEffect, useState } from "react"


interface Credentials {
  email: string;
  password: string;
}
interface SignUpModalProps {
  onClose: () => void
}

const SignUpModal = ({ onClose }: SignUpModalProps): JSX.Element => {

  const { session, signUp, error } = useAuth()

  const handleSubmit = (event: FormEvent, { email, password }: Credentials) => {
    event.preventDefault()
    signUp(email, password)
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