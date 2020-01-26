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
        registeredSuccessfully: false,
      },
    };
  }),
  on(AuthActions.RegisterUserSuccessAction, state => {
    return {
      ...state,
      registerUser: {
        ...state.registerUser,
        isLoading: false,
        registeredSuccessfully: true,
      },
    };
  }),
  on(AuthActions.RegisterUserFailAction, (state, payload) => {
    return {
      ...state,
      registerUser: {
        isLoading: false,
        error: payload.error,
        registeredSuccessfully: false,
      },
    };
  }),
  on(AuthActions.InitResetPasswordAction, state => {
    return {
      ...state,
      initPasswordReset: {
        isLoading: true,
        isSuccess: false,
        error: null,
      },
    };
  }),
  on(AuthActions.InitResetPasswordSuccessAction, state => {
    return {
      ...state,
      initPasswordReset: {
        isLoading: false,
        isSuccess: true,
        error: null,
      },
    };
  }),
  on(AuthActions.InitResetPasswordFailAction, (state, payload) => {
    return {
      ...state,
      initPasswordReset: {
        isLoading: false,
        isSuccess: false,
        error: payload.error,
      },
    };
  }),
  on(AuthActions.ResetPasswordAction, state => {
    return {
      ...state,
      passwordReset: {
        isLoading: true,
        error: null,
        isSuccess: false,
      },
    };
  }),
  on(AuthActions.ResetPasswordSuccessAction, state => {
    return {
      ...state,
      passwordReset: {
        isLoading: false,
        isSuccess: true,
        error: null,
      },
    };
  }),
  on(AuthActions.ResetPasswordFailAction, (state, payload) => {
    return {
      ...state,
      passwordReset: {
        isLoading: false,
        isSuccess: false,
        error: payload.error,
      },
    };
  }),
);
