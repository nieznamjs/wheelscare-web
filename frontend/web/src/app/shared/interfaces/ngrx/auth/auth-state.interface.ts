export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  registerUser: {
    isSuccess: boolean,
    isLoading: boolean;
    error: string | null;
  };
  passwordReset: {
    isSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
  initPasswordReset: {
    isSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
  activateUser: {
    isSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
}
