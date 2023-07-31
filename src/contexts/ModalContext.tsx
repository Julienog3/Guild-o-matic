import { createContext } from "react";
import { Modal } from "../interfaces/modal.interface";

interface ModalContextType {
  modal: Modal;
  setModal: (value: Modal) => void;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType)