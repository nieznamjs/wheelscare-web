export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  registerUser: {
    isLoading: boolean;
    error: string | null;
  };
}
