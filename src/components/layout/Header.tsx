import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Profile from "../Profile"
import { FaBell } from "react-icons/fa"
import LoginModal from "../modals/LoginModal"
import useAuth from "../../hooks/useAuth"
import { supabase } from "../../supabaseClient"
import { keysToCamel } from "../../utils/format"

const Header = (): JSX.Element => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const [profile, setProfile] = useState<any>()

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
      setProfile(formattedData[0])
    }

    getProfile()
  }, [session])

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <>
    {toggleModal && <LoginModal onClose={() => { setToggleModal(false) }} />}
    <header className="w-full p-8 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-white font-semibold font-raleway text-3xl ">GW2 Guild&apos;Finder</h1>
      </Link>
      <div className="flex gap-4">
      <div className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
        <FaBell className="text-white text-lg" />
      </div>
      {profile 
        ? <Profile profile={profile} /> 
        : <button 
            onClick={() => setToggleModal(true)}
            className="cursor-pointer w-fit px-8 font-raleway gap-8 border text-white border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors"
          >
            Sign in
          </button>
      }

      <div
        onClick={() => signOut()}
        className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
        Disconnect
      </div>
      </div>
    </header>
    </>
  )
}

export default Header