import React, { useEffect, useState } from "react"
import Page from "../components/layout/Page"
import useAuth from "../hooks/useAuth"
import { supabase } from "../supabaseClient"
import { keysToCamel } from "../utils/helpers"
import DisconnectModal from "../components/modals/DisconnectModal"
import { useNavigate } from "react-router-dom"

const Profile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<any>()
  const [playerInformations, setPlayerInformations] = useState<any>()
  const [isDisconnectModalOpened, setIsDisconnectModalOpened] = useState<boolean>(false)

  const { session, signOut } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!session.user) {
      return setUserProfile(undefined)
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

  const handleDisconnect = (): void => {
    signOut()
    navigate('/')
  }

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    const getAccount = async () => {
      await fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/account?access_token=${userProfile.apiKey}`, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => setPlayerInformations(data))
    }

    getAccount()
  }, [userProfile])

  useEffect(() => {
    console.log(playerInformations)
  }, [playerInformations])

  return (
    <>
      {isDisconnectModalOpened && 
        <DisconnectModal 
          onClose={(): void => setIsDisconnectModalOpened(false)}
          onDisconnect={(): void => handleDisconnect()} 
        />
      }
      <Page>
        {userProfile 
          ? <div>
            <div className="w-full border-b border-light-blue mb-4">
              <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Profil de {userProfile.username}</h2>
            </div>
            <div className="flex flex-col text-md mb-4">
              <label className="text-light-gray mb-2 text-md" htmlFor="">Clé api</label>
              <input className="bg-main-blue p-4 rounded-lg border border-light-blue text-white w-96" type="text" disabled value={userProfile.apiKey}/>
            </div>
            {playerInformations && <div className="flex gap-4 p-4 w-96 text-white items-center rounded-lg bg-main-blue border border-light-blue mb-4">
              <span className="bg-green w-2 h-2 rounded-full" />
              Connecté en tant que {playerInformations.name}
            </div>}
            <button className="bg-red/25 border border-red font-medium text-white p-4 rounded-lg" onClick={(): void => setIsDisconnectModalOpened(true)}>Déconnecter</button>
          </div>
          : <div>
            Vous n&apos;etes pas connecté
          </div>
        }
      </Page>
    </>
  )
}

export default Profile