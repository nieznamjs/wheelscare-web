export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  registerUser: {
    registeredSuccessfully: boolean,
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
}
