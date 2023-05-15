import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { Session } from "@supabase/supabase-js"

const useAuth = () => {
  const [session, setSession] = useState<Session>()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        return;
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
      return;
    }

    if (data.session) {
      setSession(data.session)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return;
    }
  }

  return { session, signIn, signOut }
}

export default useAuth