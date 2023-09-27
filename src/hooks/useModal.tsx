import { useContext, useState } from 'react';
import { ModalContext } from '../contexts/ModalContext';

const useModal = () => {
  const { modal, setModal } = useContext(ModalContext);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return { modal, setModal, isVisible, setIsVisible };
};

export default useModal;
