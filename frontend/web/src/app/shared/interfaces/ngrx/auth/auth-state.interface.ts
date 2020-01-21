export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  register: {
    isLoading: boolean;
    error: string | null;
  };
}
