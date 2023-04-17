import React from "react"

interface CardProps {
  children: React.ReactNode
}

const Card = ({ children }: CardProps): JSX.Element => {
  return <article className="p-8 rounded-2xl overflow-hidden bg-neutral-900">
    {children}
  </article>
}

export default Card