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
  on(AuthActions.LoginViaGoogleAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(AuthActions.LoginViaGoogleSuccessAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        isUserLogged: true,
      },
    };
  }),
  on(AuthActions.LoginViaGoogleFailAction, (state, payload) => {
    return {
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        error: payload.error,
      },
    };
  }),
  on(AuthActions.LoginViaFacebookAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(AuthActions.LoginViaFacebookSuccessAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        isUserLogged: true,
      },
    };
  }),
  on(AuthActions.LoginViaFacebookFailAction, (state, payload) => {
    return {
      ...state,
      login: {
        ...state.login,
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
        isSuccess: false,
      },
    };
  }),
  on(AuthActions.RegisterUserSuccessAction, state => {
    return {
      ...state,
      registerUser: {
        ...state.registerUser,
        isLoading: false,
        isSuccess: true,
      },
    };
  }),
  on(AuthActions.RegisterUserFailAction, (state, payload) => {
    return {
      ...state,
      registerUser: {
        isLoading: false,
        error: payload.error,
        isSuccess: false,
      },
    };
  }),
  on(AuthActions.RegisterUserViaGoogleAction, state => {
    return {
      ...state,
      registerUser: {
        ...state.registerUser,
        error: null,
        isLoading: true,
      },
    };
  }),
  on(AuthActions.RegisterUserViaGoogleSuccessAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isUserLogged: true,
      },
      registerUser: {
        ...state.registerUser,
        isLoading: false,
        isSuccess: true,
      },
    };
  }),
  on(AuthActions.RegisterUserViaGoogleFailAction, (state, payload) => {
    return {
      ...state,
      registerUser: {
        isLoading: false,
        error: payload.error,
        isSuccess: false,
      },
    };
  }),
  on(AuthActions.RegisterUserViaFacebookAction, state => {
    return {
      ...state,
      registerUser: {
        ...state.registerUser,
        error: null,
        isLoading: true,
      },
    };
  }),
  on(AuthActions.RegisterUserViaFacebookSuccessAction, state => {
    return {
      ...state,
      login: {
        ...state.login,
        isUserLogged: true,
      },
      registerUser: {
        ...state.registerUser,
        isLoading: false,
        isSuccess: true,
      }
    };
  }),
  on(AuthActions.RegisterUserViaFacebookFailAction, (state, payload) => {
    return {
      ...state,
      registerUser: {
        isLoading: false,
        error: payload.error,
        isSuccess: false,
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
  on(AuthActions.ActivateUserAction, state => {
    return {
      ...state,
      activateUser: {
        isLoading: true,
        isSuccess: false,
        error: null,
      },
    };
  }),
  on(AuthActions.ActivateUserSuccessAction, state => {
    return {
      ...state,
      activateUser: {
        isLoading: false,
        isSuccess: true,
        error: null,
      },
    };
  }),
  on(AuthActions.ActivateUserFailAction, (state, payload) => {
    return {
      ...state,
      activateUser: {
        isLoading: false,
        isSuccess: false,
        error: payload.error,
      },
    };
  }),
);
