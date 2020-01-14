export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  userRegister: {
    isLoading: boolean;
    error: string | null;
  };
}
