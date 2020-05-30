import { createAction, props } from '@ngrx/store';
import { IRegisterUserBody } from '@wheelscare/common';

enum AuthActionsTypes {
  LOGIN = '[WCW] Login',
  LOGIN_SUCCESS = '[WCW] Login Success',
  LOGIN_FAIL = '[WCW] Login Fail',
  LOGOUT = '[WCW] Logout',
  LOGOUT_SUCCESS = '[WCW] Logout Success',
  LOGOUT_FAIL = '[WCW] Logout Fail',
  LOGIN_VIA_GOOGLE = '[WCW] Login via google',
  LOGIN_VIA_GOOGLE_SUCCESS = '[WCW] Login via google Success',
  LOGIN_VIA_GOOGLE_FAIL = '[WCW] Login via google Fail',
  LOGIN_VIA_FACEBOOK = '[WCW] Login via facebook',
  LOGIN_VIA_FACEBOOK_SUCCESS = '[WCW] Login via facebook Success',
  LOGIN_VIA_FACEBOOK_FAIL = '[WCW] Login via facebook Fail',
  REGISTER_USER = '[WCW] Register User',
  REGISTER_USER_SUCCESS = '[WCW] Register User Success',
  REGISTER_USER_FAIL = '[WCW] Register User Fail',
  INIT_RESET_PASSWORD = '[WCW] Init Reset Password',
  INIT_RESET_PASSWORD_SUCCESS = '[WCW] Init Reset Password Success',
  INIT_RESET_PASSWORD_FAIL = '[WCW] Init Reset Password Fail',
  RESET_PASSWORD = '[WCW] Reset Password',
  RESET_PASSWORD_SUCCESS = '[WCW] Reset Password Success',
  RESET_PASSWORD_FAIL = '[WCW] Reset Password Fail',
  ACTIVATE_USER = '[WCW] Activate user',
  ACTIVATE_USER_SUCCESS = '[WCW] Activate user Success',
  ACTIVATE_USER_FAIL = '[WCW] Activate user Fail',
}

export const LoginAction = createAction(
  AuthActionsTypes.LOGIN,
  props<{ payload: { email: string, password: string }}>(),
);

export const LoginSuccessAction = createAction(
  AuthActionsTypes.LOGIN_SUCCESS,
);

export const LoginFailAction = createAction(
  AuthActionsTypes.LOGIN_FAIL,
  props<{ error: string }>(),
);

export const LogoutAction = createAction(
  AuthActionsTypes.LOGOUT,
);

export const LogoutSuccessAction = createAction(
  AuthActionsTypes.LOGOUT_SUCCESS,
);

export const LogoutFailAction = createAction(
  AuthActionsTypes.LOGOUT_FAIL,
  props<{ error: string }>(),
);

export const LoginViaGoogleAction = createAction(
  AuthActionsTypes.LOGIN_VIA_GOOGLE,
);

export const LoginViaGoogleSuccessAction = createAction(
  AuthActionsTypes.LOGIN_VIA_GOOGLE_SUCCESS,
);

export const LoginViaGoogleFailAction = createAction(
  AuthActionsTypes.LOGIN_VIA_GOOGLE_FAIL,
  props<{ error: string }>(),
);

export const LoginViaFacebookAction = createAction(
  AuthActionsTypes.LOGIN_VIA_FACEBOOK,
);

export const LoginViaFacebookSuccessAction = createAction(
  AuthActionsTypes.LOGIN_VIA_FACEBOOK_SUCCESS,
);

export const LoginViaFacebookFailAction = createAction(
  AuthActionsTypes.LOGIN_VIA_FACEBOOK_FAIL,
  props<{ error: string }>(),
);

export const RegisterUserAction = createAction(
  AuthActionsTypes.REGISTER_USER,
  props<{ payload: { newUser: IRegisterUserBody }}>(),
);

export const RegisterUserSuccessAction = createAction(
  AuthActionsTypes.REGISTER_USER_SUCCESS,
);

export const RegisterUserFailAction = createAction(
  AuthActionsTypes.REGISTER_USER_FAIL,
  props<{ error: string }>(),
);

export const InitResetPasswordAction = createAction(
  AuthActionsTypes.INIT_RESET_PASSWORD,
  props<{ payload: { email: string }}>(),
);

export const InitResetPasswordSuccessAction = createAction(
  AuthActionsTypes.INIT_RESET_PASSWORD_SUCCESS,
);

export const InitResetPasswordFailAction = createAction(
  AuthActionsTypes.INIT_RESET_PASSWORD_FAIL,
  props<{ error: string }>(),
);

export const ResetPasswordAction = createAction(
  AuthActionsTypes.RESET_PASSWORD,
  props<{ payload: { id: string, password: string, token: string }}>(),
);

export const ResetPasswordSuccessAction = createAction(
  AuthActionsTypes.RESET_PASSWORD_SUCCESS,
);

export const ResetPasswordFailAction = createAction(
  AuthActionsTypes.RESET_PASSWORD_FAIL,
  props<{ error: string }>(),
);

export const ActivateUserAction = createAction(
  AuthActionsTypes.ACTIVATE_USER,
  props<{ payload: { userId: string, token: string }}>(),
);

export const ActivateUserSuccessAction = createAction(
  AuthActionsTypes.ACTIVATE_USER_SUCCESS,
);

export const ActivateUserFailAction = createAction(
  AuthActionsTypes.ACTIVATE_USER_FAIL,
  props<{ error: string }>(),
);

