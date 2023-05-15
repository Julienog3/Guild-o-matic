import React from "react"
import { Link } from "react-router-dom"

interface SidebarButtonProps {
  icon: React.ReactNode
  isActive?: boolean
  to: string
}

const SidebarButton = ({ to, icon, isActive = false }: SidebarButtonProps): JSX.Element => {
  return <Link to={to}>
    <div className={`w-14 h-14 rounded-md bg-light-blue flex items-center justify-center text-white hover:border border-accent-blue transition-opacity ${isActive ? 'border ' : ''}`}>
      {icon}
    </div>
  </Link> 
}

export default SidebarButton