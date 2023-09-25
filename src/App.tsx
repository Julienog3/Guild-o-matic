import { Outlet } from "react-router-dom"
import React, { useState } from "react";
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
import { Notification } from "./interfaces/notification.interface";
import Toaster from "./components/layout/toaster/Toaster";
import AuthModal, { AuthModalTypeEnum } from "./components/modals/auth/AuthModal";
import { AuthModalContext } from "./contexts/AuthModalContext";
import GuildModal from "./components/modals/GuildModal/GuildModal";
import { GuildModalMode } from "./components/modals/GuildModal/GuildModal.intefaces";

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
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isAuthModalOpened, setIsAuthModalOpened] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<AuthModalTypeEnum>();
  const [authModalSignUpEmail, setAuthModalSignUpEmail] = useState<string>();

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
    {
      name: 'add-guild',
      label: 'Ajouter une guilde',
      icon: <AiOutlinePlus />,
      onClick: () => setIsAddingGuildModalOpened(true),
      isAuthNeeded: true
    },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={{ notifications, setNotifications }}>
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
      {isAddingGuildModalOpened && <GuildModal mode={GuildModalMode.ADDING} onClose={() => setIsAddingGuildModalOpened(false)} onSubmit={() => {}}/> }
      <ModalContext.Provider value={{ modal, setModal }}>
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
      </ModalContext.Provider>
    </AuthModalContext.Provider>
    </NotificationContext.Provider>
    </QueryClientProvider>
  )
}

export default App
