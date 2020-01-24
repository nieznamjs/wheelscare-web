import { AuthState } from '@interfaces';

export const authInitialState: AuthState = {
  login: {
    isUserLogged: false,
    isLoading: false,
    error: null,
  },
  registerUser: {
    registeredSuccessfully: false,
    isLoading: false,
    error: null,
  },
};
