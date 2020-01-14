import { AuthState } from '@interfaces';

export const authInitialState: AuthState = {
  login: {
    isUserLogged: false,
    isLoading: false,
    error: null,
  },
  userRegister: {
    isLoading: false,
    error: null,
  },
};
