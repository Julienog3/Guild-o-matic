import React from "react"
import Button from "../utils/Button"
import { Link } from "react-router-dom"
import LinkedButton from "../utils/LinkedButton"

const Header = (): JSX.Element => {
  return (
    <header className="w-100 px-8 py-4 border-b-neutral-900 border-b-[1px] flex justify-between items-center">
      <Link to="/">
        <h1 className="text-white font-bold text-xl ">GW2 Guild&apos;Finder</h1>
      </Link>
      <div className="flex gap-4">
        <LinkedButton path="/sign-up">Sign up</LinkedButton>
        <Button>Login</Button>
      </div>
    </header>
  )
}

export default Header