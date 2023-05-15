import React from "react"

interface PageProps {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: PageProps): JSX.Element => {
  return (
    <main className={`w-full px-8 h-full ${className}`}>
      {children}
    </main>
  )
}

export default Page