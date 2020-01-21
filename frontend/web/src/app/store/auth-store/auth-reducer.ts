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
  on(AuthActions.RegisterAction, state => {
    return {
      ...state,
      register: {
        isLoading: true,
        error: null,
      },
    };
  }),
  on(AuthActions.RegisterSuccessAction, state => {
    return {
      ...state,
      register: {
        ...state.register,
        isLoading: false,
      },
    };
  }),
  on(AuthActions.RegisterFailAction, (state, payload) => {
    return {
      ...state,
      register: {
        isLoading: false,
        error: payload.error,
      },
    };
  }),
);
