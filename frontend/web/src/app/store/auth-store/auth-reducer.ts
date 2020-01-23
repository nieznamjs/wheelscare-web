import * as AuthActions from './auth-actions';
import { authInitialState } from './auth-state';
import { createReducer, on } from '@ngrx/store';

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.LoginAction, state => {
    return {
      ...state,
      login: {
        isUserLogged: false,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(AuthActions.LoginSuccessAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isUserLogged: true,
        isLoading: false,
      },
    };
  }),
  on(AuthActions.LoginFailAction, (state, payload) => {
    return {
      ...state,
      login: {
        isUserLogged: false,
        isLoading: false,
        error: payload.error,
      },
    };
  }),
  on(AuthActions.RegisterUserAction, state => {
    return {
      ...state,
      registerUser: {
        isLoading: true,
        error: null,
      },
    };
  }),
  on(AuthActions.RegisterUserSuccessAction, state => {
    return {
      ...state,
      registerUser: {
        ...state.registerUser,
        isLoading: false,
      },
    };
  }),
  on(AuthActions.RegisterUserFailAction, (state, payload) => {
    return {
      ...state,
      registerUser: {
        isLoading: false,
        error: payload.error,
      },
    };
  }),
);
