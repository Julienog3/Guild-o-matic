import { createContext } from "react";
import { Modal } from "../interfaces/modal.interface";
import { AuthModalTypeEnum } from "../components/modals/auth/AuthModal";

interface AuthModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type?: AuthModalTypeEnum;
  setType: (type: AuthModalTypeEnum) => void 
}

export const AuthModalContext = createContext<AuthModalContextType>({} as AuthModalContextType)