import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import useAuth from "../../hooks/useAuth"

interface LoginFormProps {
  
}

const LoginForm = (): JSX.Element => {

  const { session, signIn } = useAuth()
 
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    console.log(session)
  }, [session])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    signIn(userData.email, userData.password)
  }

  return <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <input 
      className="bg-main-blue p-2 rounded-lg border border-light-blue text-white" 
      value={userData.email}
      onChange={e => setUserData(userData => ({
        ...userData,
        email: e.target.value
      }))}
      type="email" 
      placeholder="E-mail"
    />
    <input 
      className="bg-main-blue p-2 rounded-lg border border-light-blue text-white"
      value={userData.password}
      onChange={e => setUserData(userData => ({
        ...userData,
        password: e.target.value
      }))}
      type="password"
      placeholder="Mot de passe"
    />
    <button type="submit" className="bg-accent-blue h-12 rounded-lg px-4 text-white">Se connecter</button>
    <p className="text-white text-center font-raleway font-semibold">Vous n&apos;avez pas de compte ? <Link className="text-accent-blue" to="/">S&apos;inscrire</Link></p>
  </form>
}

export default LoginForm