import React from "react"

interface InputProps {
  type?: React.HTMLInputTypeAttribute
  name: string
  value: string
  placeholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, name, value, placeholder, handleChange }: InputProps): JSX.Element => {
  return (
    <input 
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange(e)}
      className="rounded-lg text-sm bg-transparent border max-w-lg p-2 text-white" 
    />
  )
}

export default Input 