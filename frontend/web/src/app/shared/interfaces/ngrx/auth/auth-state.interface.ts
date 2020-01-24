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
}
