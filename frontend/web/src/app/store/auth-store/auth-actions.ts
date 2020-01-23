import { createAction, props } from '@ngrx/store';
import { RegisterUserBody } from '@interfaces';

enum AuthActionsTypes {
  LOGIN = '[WCW] Login',
  LOGIN_SUCCESS = '[WCW] Login Success',
  LOGIN_FAIL = '[WCW] Login Fail',
  REGISTER_USER = '[WCW] Register User',
  REGISTER_USER_SUCCESS = '[WCW] Register User Success',
  REGISTER_USER_FAIL = '[WCW] Register User Fail',
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

export const RegisterUserAction = createAction(
  AuthActionsTypes.REGISTER_USER,
  props<{ payload: { newUser: RegisterUserBody }}>(),
);

export const RegisterUserSuccessAction = createAction(
  AuthActionsTypes.REGISTER_USER_SUCCESS,
);

export const RegisterUserFailAction = createAction(
  AuthActionsTypes.REGISTER_USER_FAIL,
  props<{ error: string }>(),
);

