import { createContext } from "react";
import { AuthModalTypeEnum } from "../components/modals/auth/AuthModal";

interface AuthModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type?: AuthModalTypeEnum;
  setType: (type: AuthModalTypeEnum) => void;
  signUpEmail?: string;
  setSignUpEmail: (signUpEmail: string) => void
}

export const AuthModalContext = createContext<AuthModalContextType>({} as AuthModalContextType)