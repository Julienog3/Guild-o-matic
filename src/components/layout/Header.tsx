import React, { useEffect, useState } from "react"
import { Link, useMatches } from "react-router-dom"
import Profile from "../Profile"
import { FaBell } from "react-icons/fa"
import LoginModal from "../modals/LoginModal"
import useAuth from "../../hooks/useAuth"
import { supabase } from "../../supabaseClient"
import { keysToCamel } from "../../utils/helpers"
import SignUpModal from "../modals/SignUpModal"

const Header = (): JSX.Element => {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false)
  const [toggleSignUpModal, setToggleSignUpModal] = useState<boolean>(false)

  const [profile, setProfile] = useState<any>()

   const matches = useMatches();

   console.log(matches)

  const { session } = useAuth()

  useEffect(() => {
    if (!session.user) {
      return setProfile(undefined)
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

  return (
    <>
    {toggleLoginModal && <LoginModal onClose={() => { setToggleLoginModal(false) }} />}
    {toggleSignUpModal && <SignUpModal onClose={() => { setToggleSignUpModal(false) }} />}
    <header className="z-10 w-full p-8 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-white font-semibold font-raleway text-3xl ">GW2 Guild&apos;Finder</h1>
      </Link>
      <div className="flex gap-4">
      <div className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
        <FaBell className="text-white text-lg" />
      </div>
      {profile 
        ? <Profile profile={profile} /> 
        : <>
          <button 
            onClick={() => setToggleLoginModal(true)}
            className="cursor-pointer w-fit px-8 py-4 font-raleway gap-8 border text-white border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors"
          >
            Sign in
          </button>
          <button 
            onClick={() => setToggleSignUpModal(true)}
            className="cursor-pointer w-fit px-8 py-4 font-raleway gap-8 border text-white border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors"
          >
            Sign up
          </button>
        </>
      }
      </div>
    </header>
    </>
  )
}

export default Header