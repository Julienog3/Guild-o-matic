import React from "react"
import Button from "../utils/Button"
import { Link } from "react-router-dom"
import LinkedButton from "../utils/LinkedButton"
import Profile from "../Profile"
import { FaBell } from "react-icons/fa"

const Header = (): JSX.Element => {
  return (
    <header className="w-full p-8 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-white font-semibold font-raleway text-3xl ">GW2 Guild&apos;Finder</h1>
      </Link>
      <div className="flex gap-4">
      <div className="cursor-pointer w-16 gap-8 border border-light-blue rounded-lg bg-main-blue flex items-center justify-center hover:border-accent-blue transition-colors">
        <FaBell className="text-white text-lg" />
      </div>
      <Profile />
      </div>
    </header>
  )
}

export default Header