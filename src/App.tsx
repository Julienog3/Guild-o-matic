import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/Header";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsFillGearFill, BsFillShieldFill } from "react-icons/bs";
import LoginModal from "./components/modals/auth/LoginModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./contexts/AuthContext";
import { Session } from "@supabase/supabase-js";
import { ModalContext } from "./contexts/ModalContext";
import { NotificationContext } from "./contexts/NotificationContext";
import { Modal, ModalType } from "./interfaces/modal.interface";
import Footer from "./components/layout/Footer";
import { supabase } from "./supabaseClient";
import { IoMdWarning } from "react-icons/io";
import { Notification, NotificationEnum } from "./interfaces/notification.interface";
import Toaster from "./components/layout/toaster/Toaster";
import AuthModal, { AuthModalTypeEnum } from "./components/modals/auth/AuthModal";
import { AuthModalContext } from "./contexts/AuthModalContext";
import ChangelogModal from "./components/modals/ChangelogModal";

export type SidebarButtonType = {
  name: string;
  label: string;
  icon: React.ReactNode;
  link: string;
  isAuthNeeded?: boolean;
}

function App() {
  const queryClient = new QueryClient()
  const [session, setSession] = useState<Session>({} as Session)
  const [modal, setModal] = useState<Modal>({} as Modal)
  const [notifications, setNotifications] = useState<Notification[]>([ ])
  const [isAuthModalOpened, setIsAuthModalOpened] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<AuthModalTypeEnum>();
  const [isChangelogModalOpened, setIsChangelogModalOpened] =
    useState<boolean>(false);

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
      label: 'Accueil',
      icon: <AiFillHome />,
      link: '/',
      isAuthNeeded: false
    },
    {
      name: 'guilds',
      label: 'Guildes',
      icon: <BsFillShieldFill />,
      link: '/guilds',
      isAuthNeeded: false
    },
    {
      name: 'add-guild',
      label: 'Ajout de guilde',
      icon: <AiOutlinePlus />,
      link: '/guilds/add',
      isAuthNeeded: true
    },
    // {
    //   name: 'settings',
    //   icon: <BsFillGearFill />,
    //   link: '/settings'
    // },
  ]

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <AuthModalContext.Provider
        value={{
          isOpen: isAuthModalOpened,
          setIsOpen: setIsAuthModalOpened,
          type: authModalType,
          setType: setAuthModalType,
        }}
      >
      <AuthModal onClose={() => setIsAuthModalOpened(false)} />
      <NotificationContext.Provider value={{ notifications, setNotifications}}>
      <ModalContext.Provider value={{ modal, setModal }}>
        <QueryClientProvider client={queryClient}>
          {isChangelogModalOpened && <ChangelogModal onClose={(): void => setIsChangelogModalOpened(false)} />}
           <div className="relative bg-bg-blue flex w-full min-h-screen">
            <Toaster />
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
          </div>
        </QueryClientProvider>
      </ModalContext.Provider>
      </NotificationContext.Provider>
      </AuthModalContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
