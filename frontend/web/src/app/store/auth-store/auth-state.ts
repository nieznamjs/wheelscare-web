import { AuthState } from '@interfaces';

export const authInitialState: AuthState = {
  login: {
    isUserLogged: false,
    isLoading: false,
    error: null,
  },
  registerUser: {
    isSuccess: false,
    isLoading: false,
    error: null,
  },
  initPasswordReset: {
    isSuccess: false,
    isLoading: false,
    error: null,
  },
  passwordReset: {
    isSuccess: false,
    isLoading: false,
    error: null,
  },
};
