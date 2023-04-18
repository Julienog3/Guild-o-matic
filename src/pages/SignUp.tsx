import React, { useEffect, useState } from "react";
import Page from "../components/layout/Page";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";

type UserType = {
  username: string
  password: string
  apikey: string
}

function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>({
    username: "",
    password: "",
    apikey: "",
  })

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitted(true)
    console.log(user)
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    fetch(`${import.meta.env.VITE_GW2_API_URL}/account`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        mode: 'no-cors',
        authentication: `Bearer ${user.apikey}`
      }
    })
  }, [isSubmitted])

  return (
    <Page>
      <h2 className="text-5xl font-bold text-white mb-4">Inscription</h2>
      <form 
        className="flex flex-col gap-4" 
        onSubmit={(e: React.SyntheticEvent): void => handleSubmit(e)}
      >
        <Input 
          type="text"
          name="username"
          value={user.username} 
          placeholder="Nom d'utilisateur"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handleUserChange(e)
          }}  
        />
        <Input 
          type="text"
          name="apikey"
          value={user.apikey}
          placeholder="Clé d'api GW2" 
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handleUserChange(e)
          }} 
        />
        <Input 
          type="password"
          name="password"
          value={user.password}
          placeholder="Mot de passe" 
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handleUserChange(e)
          }} 
        />
        <Button type="submit">S&apos;inscrire</Button>
      </form>
    </Page>
  )
}

export default SignUp