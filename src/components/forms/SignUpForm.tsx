import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import useAuth from "../../hooks/useAuth"
import FormError from "./FormError"
import { AuthError } from "@supabase/supabase-js"
import { GW2UserType } from "../../interfaces/gw2/user"

interface SignUpFormProps {
  onSubmit: (event: FormEvent, credentials: Credentials) => void;
  error?: AuthError
}

interface Credentials {
  username: string;
  email: string;
  gw2ApiKey: string;
  password: string;
  repeatedPassword: string;
}

const SignUpForm = ({ onSubmit, error }: SignUpFormProps): JSX.Element => {
  const [playerInformations, setPlayerInformations] = useState<GW2UserType>()

  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    email: '',
    gw2ApiKey: '',
    password: '',
    repeatedPassword: ''
  })

  const verifyCredentials = () => {
    if (credentials.password !== credentials.repeatedPassword) {
      return;
    }
  }

  useEffect(() => {
    if (!credentials.gw2ApiKey) {
      return;
    }

    const getAccount = async () => {
      await fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/account?access_token=${credentials.gw2ApiKey}`, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => setPlayerInformations(data))
    }

    getAccount()
  }, [credentials.gw2ApiKey])

  return <form className="flex flex-col gap-8 h-full" onSubmit={(e: FormEvent) => onSubmit(e, credentials)}>
    {error &&<FormError>
      {error.message}
    </FormError>}
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col w-full">
          <label className="text-light-gray mb-2 text-sm" htmlFor="username">Pseudo <span className="text-accent-blue">*</span></label>
          <input 
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue" 
            required
            value={credentials.username}
            onChange={e => setCredentials(credentials => ({
              ...credentials,
              username: e.target.value
            }))}
            minLength={5}
            maxLength={50}
            type="text" 
            placeholder="Pseudo"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">E-mail <span className="text-accent-blue">*</span></label>
          <input 
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white focus:outline-none focus:border-accent-blue" 
            required
            value={credentials.email}
            onChange={e => setCredentials(credentials => ({
              ...credentials,
              email: e.target.value
            }))}
            type="email" 
            placeholder="E-mail"
          />
        </div>
      </div>

        
        <div className="flex flex-col">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">Clé API Guild Wars 2</label>
          <input 
            className="bg-bg-blue text-sm p-4 rounded-lg border border-light-blue text-white mb-4 focus:outline-none focus:border-accent-blue" 
            value={credentials.gw2ApiKey}
            onChange={e => setCredentials(credentials => ({
              ...credentials,
              gw2ApiKey: e.target.value
            }))}
            type="text" 
            placeholder="Clé API"
          />
          {playerInformations && playerInformations.id && <div className="flex gap-4 p-4 w-full text-sm text-white items-center rounded-lg bg-green/20 border-green border  mb-4">
            <span className="bg-green w-2 h-2 rounded-full" />
            Connecté en tant que {playerInformations.name}
          </div>}
        </div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col w-full">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">Mot de passe <span className="text-accent-blue">*</span></label>
          <input 
            className="bg-bg-blue p-4 rounded-lg border border-light-blue text-white text-sm focus:outline-none focus:border-accent-blue"
            required   
            value={credentials.password}
            onChange={e => setCredentials(credentials => ({
              ...credentials,
              password: e.target.value
            }))}
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-light-gray mb-2 text-sm" htmlFor="password">Vérification mot de passe <span className="text-accent-blue">*</span></label>
          <input 
            className="bg-bg-blue p-4 text-sm rounded-lg border border-light-blue text-white mb-3 focus:outline-none focus:border-accent-blue"     
            required      
            value={credentials.repeatedPassword}
            onChange={e => setCredentials(credentials => ({
              ...credentials,
              repeatedPassword: e.target.value
            }))}
            type="password"
            placeholder="Mot de passe"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center gap-6">
      <button type="submit" className="bg-accent-blue rounded-lg p-4 font-raleway text-white">S&apos;inscrire</button>
      <p className="text-white text-sm text-center font-raleway">Vous avez déjà un compte ? <Link className="text-accent-blue" to="/">Se connecter</Link></p>
    </div>
  </form>
}

export default SignUpForm