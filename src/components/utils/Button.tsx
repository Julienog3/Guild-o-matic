import React from "react"

interface ButtonProps {
  children: React.ReactNode
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-neutral-900 px-8 py-3 text-white rounded-full">
      {children}
    </button>
  )
}

export default Button