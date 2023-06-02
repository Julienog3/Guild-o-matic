import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { AuthError, Session } from "@supabase/supabase-js"
import { AuthContext } from "../contexts/AuthContext";

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

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
    })

    if (error) {
      setError(error)
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