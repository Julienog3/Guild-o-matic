import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { AuthError, Session } from "@supabase/supabase-js"

const useAuth = () => {
  const [session, setSession] = useState<Session>()
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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return setError(error)
    }

    setSession(undefined)
  }

  return { session, error, signIn, signOut }
}

export default useAuth