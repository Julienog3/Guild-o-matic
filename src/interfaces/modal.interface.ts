export enum ModalType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
}

export type Modal = {
  isToggled: boolean,
  type?: ModalType,
};
