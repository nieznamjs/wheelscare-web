import { createAction, props } from '@ngrx/store';
import { RegisterUserBody } from '@interfaces';

export enum AuthActionsTypes {
  LOGIN = '[WCW] Login',
  LOGIN_SUCCESS = '[WCW] Login Success',
  LOGIN_FAIL = '[WCW] Login Fail',
  REGISTER = '[WCW] Register',
  REGISTER_SUCCESS = '[WCW] Register Success',
  REGISTER_FAIL = '[WCW] Register Fail',
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
  props<{ payload: { error: string }}>(),
);

export const RegisterAction = createAction(
  AuthActionsTypes.REGISTER,
  props<{ payload: { newUser: RegisterUserBody }}>(),
);

export const RegisterSuccessAction = createAction(
  AuthActionsTypes.REGISTER_SUCCESS,
);

export const RegisterFailAction = createAction(
  AuthActionsTypes.REGISTER_FAIL,
  props<{ payload: { error: string }}>(),
);
