import React, { useEffect, useState } from "react"
import Page from "../components/layout/Page"
import useAuth from "../hooks/useAuth"
import { supabase } from "../supabaseClient"
import { keysToCamel } from "../utils/format"

const Profile = (): JSX.Element => {

  const [userProfile, setUserProfile] = useState<any>()
  const { session, signOut } = useAuth()

  useEffect(() => {
    if (!session) {
      return;
    }
    
    const getProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)

      if (error) {
        return;
      }

      const formattedData = keysToCamel(data)
      setUserProfile(formattedData[0])
    }

    getProfile()
  }, [session])

  return (
    <Page>
      {userProfile && <div>
        <div className="w-full border-b border-light-blue mb-4">
          <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Profil de {userProfile.username}</h2>
        </div>
        <div className="flex flex-col text-md mb-4">
          <label className="text-light-gray mb-2 text-md" htmlFor="">Clé api</label>
          <input className="bg-main-blue p-4 rounded-lg border border-light-blue text-white w-96" type="text" disabled value={userProfile.apiKey}/>
        </div>
        <button className="bg-red/25 border border-red font-medium text-white p-4 rounded-lg" onClick={(): Promise<void> => signOut()}>Déconnecter</button>
      </div>}
    </Page>
  )
}

export default Profile