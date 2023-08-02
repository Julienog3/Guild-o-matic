import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/Header";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsFillGearFill, BsFillShieldFill } from "react-icons/bs";
import LoginModal from "./components/modals/LoginModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./contexts/AuthContext";
import { Session } from "@supabase/supabase-js";
import Landing from "./pages/Landing";
import { ModalContext } from "./contexts/ModalContext";
import { Modal, ModalType } from "./interfaces/modal.interface";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/Alert";
import { supabase } from "./supabaseClient";
import { IoMdWarning } from "react-icons/io";

export type SidebarButtonType = {
  name: string,
  icon: React.ReactNode,
  link: string,
}

function App() {
  const queryClient = new QueryClient()
  const [session, setSession] = useState<Session>({} as Session)
  const [modal, setModal] = useState<Modal>({} as Modal)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        return
      }
  
      if (data.session) {
        setSession(data.session)
      }
    } 

    getSession()
  }, [])

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
    {
      name: 'add-guild',
      icon: <AiOutlinePlus />,
      link: '/guilds/add'
    },
    {
      name: 'settings',
      icon: <BsFillGearFill />,
      link: '/settings'
    },
  ]

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <ModalContext.Provider value={{ modal, setModal }}>
        <QueryClientProvider client={queryClient}>
          {session.user ? <div className="relative bg-bg-blue flex w-full min-h-screen">
            <Sidebar buttons={sidebarButtons} />
            <div className="flex flex-col gap-4 p-8 h-screen overflow-y-scroll w-full">
              <div className="flex items-center gap-4 text-yellow-500 bg-yellow-500/25 border border-yellow-500 rounded-md mb-6 max-w-7xl mx-auto w-full p-4">
                <IoMdWarning className="text-lg" />
                Site en cours de développement
              </div>
              <Header />
              <Outlet />
              <Footer />
            </div>
          </div> : <Landing />}
        </QueryClientProvider>
      </ModalContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
