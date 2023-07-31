import React, { useState } from "react"
import LoginModal from "../components/modals/LoginModal"
import SignUpModal from "../components/modals/SignUpModal"

function Landing(): JSX.Element {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false)
  const [toggleSignUpModal, setToggleSignUpModal] = useState<boolean>(false)

  return (
    <>
      {toggleLoginModal && <LoginModal onClose={() => { setToggleLoginModal(false) }} />}
      {toggleSignUpModal && <SignUpModal onClose={() => { setToggleSignUpModal(false) }} />}
      <div className="relative bg-bg-blue flex items-center justify-center w-full h-screen">
        <div className="flex flex-col gap-4 items-center z-10">
          <h1 className="text-white font-bold text-6xl">Guild-o-<span className="text-accent-blue">matic</span></h1>
          <p className="text-light-gray  mb-4">La plateforme pour trouver la guilde qui vous correspond</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setToggleLoginModal(true)} className="rounded-lg bg-main-blue border-light-blue border px-6 py-4 text-white w-fit">Se connecter</button>
            <button type="button" onClick={() => setToggleSignUpModal(true)} className="rounded-lg bg-accent-blue px-6 py-4 text-white w-fit">S&apos;inscrire</button>
          </div>
        </div>
        <img className="absolute top-0 left-0 opacity-25 h-full object-cover w-full" src="./images/bg-landing.jpg" alt="" />
      </div>
    </>
  ) 
}

export default Landing