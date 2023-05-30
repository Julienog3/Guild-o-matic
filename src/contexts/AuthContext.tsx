import { createContext } from "react";
import { Session } from "@supabase/supabase-js"

interface AuthContextType {
  session: Session;
  setSession: (value: Session) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)