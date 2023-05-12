import { Outlet } from "react-router-dom"
import React from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/Header";
import { AiFillHome } from "react-icons/ai";
import { BsFillShieldFill } from "react-icons/bs";

export type SidebarButtonType = {
  name: string
  icon: React.ReactNode
  link: string
}

function App() {
  const sidebarButtons: SidebarButtonType[] = [
    {
      name: 'home',
      icon: <AiFillHome />,
      link: '/'
    },
    {
      name: 'guilds',
      icon: <BsFillShieldFill />,
      link: '/guilds'
    },
  ]

  return (
    <div className="bg-bg-blue flex w-full min-h-screen">
      <Sidebar buttons={sidebarButtons} />
      <div className="flex flex-col gap-8 min-h-screen w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default App
