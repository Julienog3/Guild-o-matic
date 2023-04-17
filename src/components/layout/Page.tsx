import React from "react"

interface PageProps {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: PageProps): JSX.Element => {
  return (
    <main className={`max-w-7xl m-auto py-8 min-h-screen ${className}`}>
      {children}
    </main>
  )
}

export default Page