import React from "react"
import { Link } from "react-router-dom"
import Button from "./Button"

interface LinkedButtonProps {
  path: string
  children: React.ReactNode
}

const LinkedButton = ({ path, children }: LinkedButtonProps) => {
  return (
    <Link to={path}>
      <Button>
        {children}
      </Button>
    </Link>
  )
}

export default LinkedButton