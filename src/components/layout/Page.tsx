import React from "react"

interface PageProps {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: PageProps): JSX.Element => {
  return (
    <main className={`page min-w-7xl px-8 ${className}`}>
      {children}
    </main>
  )
}

export default Page