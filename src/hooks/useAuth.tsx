import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { AuthError, Session } from "@supabase/supabase-js"
import { AuthContext } from "../contexts/AuthContext";
import { profilesService } from "../services/profiles.service";

const useAuth = () => {
  const { session, setSession } = useContext(AuthContext);
  const [error, setError] = useState<AuthError>()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setError(error)
      }
  
      if (data.session) {
        setSession(data.session)
      }
    } 

    getSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError(error)
    }

    if (data.session) {
      setSession(data.session)
    }
  }

  const signUp = async (credentials: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      setError(error)
    }

    if (data.user) {
      await profilesService.postProfile({
        userId: data.user.id,
        username: credentials.username,
        apiKey: credentials.gw2ApiKey,
      })
    }

    console.log(data.user)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return setError(error)
    }

    setSession({} as Session) 
  }

  return { session, error, signIn, signUp, signOut }
}

export default useAuth