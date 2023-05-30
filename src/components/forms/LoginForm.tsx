import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import useAuth from "../../hooks/useAuth"
import FormError from "./FormError"
import { AuthError } from "@supabase/supabase-js"

interface LoginFormProps {
  onSubmit: (event: FormEvent, credentials: Credentials) => void;
  error?: AuthError
}

interface Credentials {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit, error }: LoginFormProps): JSX.Element => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  })

  return <form className="flex flex-col gap-8 h-full" onSubmit={(e: FormEvent) => onSubmit(e, credentials)}>
    {error &&<FormError>
      {error.message}
    </FormError>}
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col">
        <label className="text-light-gray mb-2 text-md" htmlFor="password">E-mail</label>
        <input 
          className="bg-main-blue p-4 rounded-lg border border-light-blue text-white" 
          value={credentials.email}
          onChange={e => setCredentials(credentials => ({
            ...credentials,
            email: e.target.value
          }))}
          type="email" 
          placeholder="E-mail"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-light-gray mb-2 text-md" htmlFor="password">Mot de passe</label>
        <input 
          className="bg-main-blue p-4 rounded-lg border border-light-blue text-white mb-3"
          value={credentials.password}
          onChange={e => setCredentials(credentials => ({
            ...credentials,
            password: e.target.value
          }))}
          type="password"
          placeholder="Mot de passe"
        />
        <Link className="text-accent-blue font-raleway self-end" to="/">Mot de passe oublié ?</Link>
      </div>
    </div>
    <div className="flex flex-col justify-center gap-6">
      <button type="submit" className="bg-accent-blue rounded-lg p-4 text-lg font-raleway text-white">Se connecter</button>
      <p className="text-white text-center font-raleway">Vous n&apos;avez pas de compte ? <Link className="text-accent-blue" to="/">S&apos;inscrire</Link></p>
    </div>
  </form>
}

export default LoginForm