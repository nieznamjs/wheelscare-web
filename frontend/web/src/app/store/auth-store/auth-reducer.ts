import { AuthState } from '@interfaces';
import { AuthActions, AuthActionsTypes } from './auth-actions';
import { authInitialState } from './auth-state';

export function authReducer(state: AuthState = authInitialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN: {
      return {
        ...state,
        login: {
          isUserLogged: false,
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        login: {
          ...state.login,
          isUserLogged: true,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.LOGIN_FAIL: {
      return {
        ...state,
        login: {
          isUserLogged: false,
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionsTypes.REGISTER: {
      return {
        ...state,
        userRegister: {
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.REGISTER_FAIL: {
      return {
        ...state,
        userRegister: {
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    default: {
      return state;
    }
  }
}
