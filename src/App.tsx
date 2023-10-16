import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/Header";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsFillGearFill, BsFillShieldFill } from "react-icons/bs";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalContext } from "./contexts/ModalContext";
import { NotificationContext } from "./contexts/NotificationContext";
import { Modal } from "./interfaces/modal.interface";
import Footer from "./components/layout/Footer";
import { IoMdWarning } from "react-icons/io";
import { Notification, NotificationEnum } from "./interfaces/notification.interface";
import Toaster from "./components/layout/toaster/Toaster";
import AuthModal, { AuthModalTypeEnum } from "./components/modals/auth/AuthModal";
import { AuthModalContext } from "./contexts/AuthModalContext";
import GuildModal from "./components/modals/GuildModal/GuildModal";
import { GuildModalMode } from "./components/modals/GuildModal/GuildModal.intefaces";
import { useTransition } from "@react-spring/web";
import useNotificationStore from './stores/useNotificationStore';

export type SidebarButtonType = {
  name: string;
  label: string;
  icon: React.ReactNode;
  link?: string;
  onClick?: () => void;
  isAuthNeeded?: boolean;
}

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [modal, setModal] = useState<Modal>({} as Modal)
  const [isAddingGuildModalOpened, setIsAddingGuildModalOpened] = useState<boolean>(false)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [isAuthModalOpened, setIsAuthModalOpened] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<AuthModalTypeEnum>();
  const [authModalSignUpEmail, setAuthModalSignUpEmail] = useState<string>();

  const guildModalTransition = useTransition(isAddingGuildModalOpened, {
    from: {
      y: 0,
      opacity: 0,
    },
    enter: {
      y: -10,
      opacity: 1,
    },
    leave: {
      y: 0,
      opacity: 0,
    },
    config: {
      duration: 200,
    },
  })

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
      label: 'Toutes les guildes',
      icon: <BsFillShieldFill />,
      link: '/guilds',
      isAuthNeeded: false
    },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <AuthModalContext.Provider
        value={{
          isOpen: isAuthModalOpened,
          setIsOpen: setIsAuthModalOpened,
          type: authModalType,
          setType: setAuthModalType,
          signUpEmail: authModalSignUpEmail,
          setSignUpEmail: setAuthModalSignUpEmail,
        }}
      >
      <AuthModal onClose={() => setIsAuthModalOpened(false)} />
      {guildModalTransition((style, isOpened) => (
        <>{isOpened && <GuildModal 
          style={{...style}}
          mode={GuildModalMode.ADDING}
          onClose={() => setIsAddingGuildModalOpened(false)}
          onSubmit={() => {}}/> }
        </>
      ))}
      <ModalContext.Provider value={{ modal, setModal }}>
        <div className="relative bg-bg-blue flex w-full min-h-screen">
          <Toaster />
          <Sidebar buttons={sidebarButtons} onAddingGuild={() => setIsAddingGuildModalOpened(true)} />
          <div className="flex flex-col gap-4 p-8 h-screen overflow-y-scroll w-full relative">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
      </ModalContext.Provider>
    </AuthModalContext.Provider>
    </QueryClientProvider>
  )
}

export default App
